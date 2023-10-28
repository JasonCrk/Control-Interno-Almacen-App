import axios from "axios"

import config from "../config"

export const authApi = axios.create({
  baseURL: config.BASE_API_URL + "/auth",
})
