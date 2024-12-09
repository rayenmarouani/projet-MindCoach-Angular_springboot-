package isetb.tp5.mindcoach;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import java.util.List;

public class MainActivity extends AppCompatActivity implements SessionAdapter.OnSessionActionListener {

    private RecyclerView recyclerView;
    private SessionAdapter adapter;
    private SessionApi sessionApi;
    private Button btnAddSession;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        btnAddSession = findViewById(R.id.btn_add_session);
        sessionApi = ApiClient.getRetrofitInstance().create(SessionApi.class);

        btnAddSession.setOnClickListener(v -> {
            // Navigate to AddSessionActivity
            Intent intent = new Intent(MainActivity.this, AddSessionActivity.class);
            startActivityForResult(intent, 1); // Start AddSessionActivity
        });

        fetchSessions();  // Fetch sessions initially
    }

    private void fetchSessions() {
        sessionApi.getAllSessions().enqueue(new Callback<List<Session>>() {
            @Override
            public void onResponse(Call<List<Session>> call, Response<List<Session>> response) {
                if (response.isSuccessful()) {
                    List<Session> sessionList = response.body();
                    adapter = new SessionAdapter(sessionList, MainActivity.this);
                    recyclerView.setAdapter(adapter);
                } else {
                    Toast.makeText(MainActivity.this, "Failed to fetch sessions", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Session>> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onEditSession(Session session) {
        // Navigate to UpdateSessionActivity to edit session details
        Intent intent = new Intent(MainActivity.this, UpdateSessionActivity.class);
        intent.putExtra("session_id", session.getId());
        intent.putExtra("session_title", session.getTitle());
        intent.putExtra("session_description", session.getDescription());
        intent.putExtra("session_status", session.getStatus());
        intent.putExtra("session_notes", session.getNotes());
        intent.putExtra("session_client_name", session.getClientName());
        startActivityForResult(intent, 1);  // Start UpdateSessionActivity
    }

    @Override
    public void onDeleteSession(Session session) {
        // Handle deleting the session
        sessionApi.deleteSession(session.getId()).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(MainActivity.this, "Session deleted successfully", Toast.LENGTH_SHORT).show();
                    fetchSessions();  // Refresh the session list
                } else {
                    Toast.makeText(MainActivity.this, "Failed to delete session", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == 1 && resultCode == RESULT_OK) {
            String actionType = data.getStringExtra("action_type");

            if ("add".equals(actionType)) {
                // Add new session to adapter
                Session newSession = (Session) data.getSerializableExtra("session");
                adapter.getSessionList().add(newSession);
                adapter.notifyItemInserted(adapter.getSessionList().size() - 1);
            } else if ("update".equals(actionType)) {
                // Update the session in the adapter
                int position = data.getIntExtra("session_position", -1); // Get position from intent
                if (position != -1) {
                    Session updatedSession = adapter.getSessionList().get(position);
                    updatedSession.setTitle(data.getStringExtra("session_title"));
                    updatedSession.setDescription(data.getStringExtra("session_description"));
                    updatedSession.setStatus(data.getStringExtra("session_status"));
                    updatedSession.setNotes(data.getStringExtra("session_notes"));
                    updatedSession.setClientName(data.getStringExtra("session_client_name"));
                    adapter.notifyItemChanged(position);
                }
            }
        }


    }
}