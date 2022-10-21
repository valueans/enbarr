import log from './log'
import type { AuthenticationResponse } from './types'
const endpoint = 'https://tiny-bird-36835.botics.co/api/v1'

// TODO fix fetch types
export default class API {
  headers: HeadersInit_ & {
    Authotization?: string
    'Content-Type': string
  } = {
    'Content-Type': 'application/json'
  }

  init = (token: string) => {
    this.headers.Authotization = token
  }

  private static instance: API

  static shared(): API {
    if (!API.instance) {
      API.instance = new API()
    }

    return API.instance
  }

  request = async <T = {}>(
    path: RequestInfo,
    params?: RequestInit
  ): Promise<T> => {
    const _params: RequestInit = {
      ...params,
      headers: { ...this.headers, ...params?.headers }
    }

    try {
      const res = await fetch(path, _params)
      log.info(`${res.url}: ${res.status}`)

      if (res.status >= 300) {
        const payload = await res.text()
        try {
          const jsonPayload = JSON.parse(payload)
          throw new Error(jsonPayload) // business specific network error
        } catch (e) {
          throw new Error(payload) // server specific network error
        }
      }

      return res.json() as T
    } catch (e) {
      throw e // device specific network error
    }
  }

  login = (body: { username: string; password: string }) =>
    this.request<AuthenticationResponse>(`${endpoint}/login/`, {
      method: 'POST',
      body: JSON.stringify(body)
    })

  register = (body: { email: string; password: string }) =>
    this.request<AuthenticationResponse>(`${endpoint}/signup/`, {
      method: 'POST',
      body: JSON.stringify(body)
    })
}
