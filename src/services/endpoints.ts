import axios from "axios"

import config from "../config"

export const authBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + "/auth",
})

export const userBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + "/usuarios",
})

export const memorandumsBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + "/memorandums",
})

export const informeBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + "/informes",
})

export const actasBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + "/actas",
})
