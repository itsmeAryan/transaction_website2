import axios from "axios";
import { baseUrl } from "../../config/env.config";

export const apiClient=axios.create({
    baseURL:baseUrl
})