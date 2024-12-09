package isetb.tp5.mindcoach;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddSessionActivity extends AppCompatActivity {

    private EditText editTitle, editDescription, editStatus, editNotes, editClientName;
    private Button btnAddSession;
    private SessionApi sessionApi;
    private ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_session);

        // Initialize views
        editTitle = findViewById(R.id.edit_title);
        editDescription = findViewById(R.id.edit_description);
        editStatus = findViewById(R.id.edit_status);
        editNotes = findViewById(R.id.edit_notes);
        editClientName = findViewById(R.id.edit_client_name);
        btnAddSession = findViewById(R.id.btn_add_session);

        // Initialize Retrofit API
        sessionApi = ApiClient.getRetrofitInstance().create(SessionApi.class);

        // Set up the Add button listener
        btnAddSession.setOnClickListener(v -> {
            // Collect input data
            String title = editTitle.getText().toString().trim();
            String description = editDescription.getText().toString().trim();
            String status = editStatus.getText().toString().trim();
            String notes = editNotes.getText().toString().trim();
            String clientName = editClientName.getText().toString().trim();

            // Validate inputs
            if (!validateInputs(title, description, status, notes, clientName)) return;

            // Create a new Session object
            Session newSession = new Session(title, description, status, notes, clientName);

            // Show progress dialog
            progressDialog = ProgressDialog.show(AddSessionActivity.this, "Adding Session", "Please wait...", true);

            // Use Retrofit to add the new session
            sessionApi.addSession(newSession).enqueue(new Callback<Session>() {
                @Override
                public void onResponse(Call<Session> call, Response<Session> response) {
                    progressDialog.dismiss(); // Hide progress dialog

                    if (response.isSuccessful() && response.body() != null) {
                        Toast.makeText(AddSessionActivity.this, "Session added successfully!", Toast.LENGTH_SHORT).show();

                        // Return the newly created session to the MainActivity
                        Intent resultIntent = new Intent();
                        resultIntent.putExtra("action_type", "add");
                        resultIntent.putExtra("session", (CharSequence) response.body());
                        setResult(RESULT_OK, resultIntent);

                        finish(); // Close the activity
                    } else {
                        Toast.makeText(AddSessionActivity.this, "Failed to add session", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<Session> call, Throwable t) {
                    progressDialog.dismiss(); // Hide progress dialog
                    Toast.makeText(AddSessionActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });
        });
    }





    private boolean validateInputs(String title, String description, String status, String notes, String clientName) {
        if (title.isEmpty()) {
            editTitle.setError("Title is required");
            return false;
        }
        if (description.isEmpty()) {
            editDescription.setError("Description is required");
            return false;
        }
        if (status.isEmpty()) {
            editStatus.setError("Status is required");
            return false;
        }
        if (notes.isEmpty()) {
            editNotes.setError("Notes are required");
            return false;
        }
        if (clientName.isEmpty()) {
            editClientName.setError("Client name is required");
            return false;
        }
        return true;
    }
}