import axios from "axios";
import BaseURL from "../BaseURL";
const api = axios.create({
  baseURL: BaseURL,
});
export default api;
