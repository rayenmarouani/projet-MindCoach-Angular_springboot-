package isetb.tp5.mindcoach;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class UpdateSessionActivity extends AppCompatActivity {

    private EditText editTitle, editDescription, editStatus, editNotes, editClientName;
    private Button btnSave;
    private SessionApi sessionApi;
    private ProgressDialog progressDialog;

    private Long sessionId; // Store the session ID for updating

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_session);

        // Initialize views
        editTitle = findViewById(R.id.editTitle);
        editDescription = findViewById(R.id.editDescription);
        editStatus = findViewById(R.id.editStatus);
        editNotes = findViewById(R.id.editNotes);
        editClientName = findViewById(R.id.editClientName);
        btnSave = findViewById(R.id.btnSave);

        // Initialize Retrofit API
        sessionApi = ApiClient.getRetrofitInstance().create(SessionApi.class);

        // Get the session data passed from the previous activity
        Intent intent = getIntent();
        sessionId = intent.getLongExtra("session_id", -1);
        editTitle.setText(intent.getStringExtra("session_title"));
        editDescription.setText(intent.getStringExtra("session_description"));
        editStatus.setText(intent.getStringExtra("session_status"));
        editNotes.setText(intent.getStringExtra("session_notes"));
        editClientName.setText(intent.getStringExtra("session_client_name"));

        // Set up the Save button listener
        btnSave.setOnClickListener(v -> {
            // Collect the updated data
            String title = editTitle.getText().toString().trim();
            String description = editDescription.getText().toString().trim();
            String status = editStatus.getText().toString().trim();
            String notes = editNotes.getText().toString().trim();
            String clientName = editClientName.getText().toString().trim();

            // Validate inputs
            if (!validateInputs(title, description, status, notes, clientName)) return;

            // Create a new session object with updated data
            Session updatedSession = new Session(sessionId, title, description, status, notes, clientName);

            // Show progress dialog
            progressDialog = ProgressDialog.show(UpdateSessionActivity.this, "Updating Session", "Please wait...", true);

            // Call the update session API endpoint
            sessionApi.updateSession(sessionId, updatedSession).enqueue(new retrofit2.Callback<Void>() {
                @Override
                public void onResponse(retrofit2.Call<Void> call, retrofit2.Response<Void> response) {
                    progressDialog.dismiss(); // Hide progress dialog

                    if (response.isSuccessful()) {
                        // On success, show a toast and return the updated session
                        Toast.makeText(UpdateSessionActivity.this, "Session updated successfully!", Toast.LENGTH_SHORT).show();

                        // Return the updated session to the calling activity
                        Intent resultIntent = new Intent();
                        resultIntent.putExtra("action_type", "update");
                        resultIntent.putExtra("session", (CharSequence) updatedSession);
                        setResult(RESULT_OK, resultIntent);

                        finish(); // Close the activity
                    } else {
                        Toast.makeText(UpdateSessionActivity.this, "Failed to update session!", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(retrofit2.Call<Void> call, Throwable t) {
                    progressDialog.dismiss(); // Hide progress dialog
                    Toast.makeText(UpdateSessionActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });
        });
    }

    /**
     * Validates input fields.
     *
     * @param title       The session title.
     * @param description The session description.
     * @param status      The session status.
     * @param notes       Additional session notes.
     * @param clientName  The client name for the session.
     * @return True if all inputs are valid, false otherwise.
     */
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