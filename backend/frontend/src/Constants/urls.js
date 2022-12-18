// production
// export const baseUrl = "http://tiny-bird-36835.botics.co/";
// development
export const baseUrl = "http://127.0.0.1:8000/";
export const api = `${baseUrl}api/v1/`;


export const usersUrl = `${api}users/`
export const loginUrl = `${usersUrl}login/`
export const signUpUrl = `${usersUrl}signup/`
export const verifyOtpUrl = `${usersUrl}verifyotp/`
export const sendOtpUrl = `${usersUrl}sendotp/`
export const resetEmailUrl = `${usersUrl}reset-email/`
export const resetPasswordUrl = `${usersUrl}reset-password/`
export const deleteUserUrl = `${usersUrl}delete-user/`

export const feedbackUrl = `${api}feedback/`
export const chatUrl = `${api}chat/`
export const paymentUrl = `${api}payment/`