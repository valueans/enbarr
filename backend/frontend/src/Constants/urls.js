// production
// export const baseUrl = "https://tiny-bird-36835.botics.co/";
// development
export const baseUrl = "http://127.0.0.1:8000/";
export const api = `${baseUrl}api/v1/`;


export const usersUrl = `${api}users/`;
export const loginUrl = `${usersUrl}login/`;
export const signUpUrl = `${usersUrl}signup/`;
export const verifyOtpUrl = `${usersUrl}verifyotp/`;
export const sendOtpUrl = `${usersUrl}sendotp/`;
export const resetEmailUrl = `${usersUrl}reset-email/`;
export const resetPasswordUrl = `${usersUrl}reset-password/`;
export const deleteUserUrl = `${usersUrl}delete-user/`;

export const feedbackUrl = `${api}feedback/`;
export const chatUrl = `${api}chat/`;
export const paymentUrl = `${api}payment/`;

// horse urls
export const recentlyAddedHorsesUrl = `${api}recently-added-horses/`
export const topHorsesUrl = `${api}top-horses/`
export const trendingHorsesUrl = `${api}trending-horses/`
// favorite horses

export const favouriteHorsesUrl = `${api}favourite/`

// my horses
export const myHorsesUrl = `${api}horse/`


// notifications

export const myNotifications = `${api}notifications/notifications/`;

// social links
export const facebookLink  = "https://www.facebook.com/";
export const linkedinLink  = "https://pk.linkedin.com/";
export const twitterLink  = "https://twitter.com/?lang=en";
export const instagramLink  = "https://www.instagram.com/";
export const googlePlayLink  = "https://play.google.com/store/apps/details?id=com.pikpok.hrc.play";
export const appleStoreLink  = "https://www.apple.com/app-store/";