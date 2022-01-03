import axios from "axios";

const envBaseUrl = "https://uxcandy.com/~shapoval/test-task-backend/v2";

export const apiCall = axios.create({
  baseURL: envBaseUrl,
  params: {
    developer: "Nekoula",
  },
});

apiCall.defaults.headers.post["Content-Type"] = "application/json";
