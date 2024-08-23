import axios from "axios";
import { API } from "~/constants/endpoints";

const http = axios.create({
  baseURL: API.BASE_URL,
});

export default http;
