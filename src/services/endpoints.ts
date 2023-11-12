import axios from "axios"

import config from "../config"

export const authBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + "/auth",
})

export const memorandumsBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + "/memorandums",
})

export const actasBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + "/actas",
})
