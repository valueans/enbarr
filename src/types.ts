export type LoginResponse = {
  token: string
  user: {
    id: number
    email: string
    name: string
  }
}

export type LoginRequest = {
  username: string
  password: string
}

export type RegisterRequest = {
  email: string
  password: string
}

export type AuthenticationResponse = {
  token: string
  user: {
    id: number
    email: string
    name: string
  }
}
