package isetb.tp5.mindcoach;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public  class ApiClient {
    private static final String BASE_URL = "http://10.0.2.2:8081"; // Use emulator's localhost
    private static Retrofit retrofit;

    public static Retrofit getRetrofitInstance() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }
}