export const baseUrl = "https://enbarrapp.com";
// export const baseUrl = 'https://staging.enbarrapp.com'


export const api = `${baseUrl}/api/v1/`
export const usersUrl = `${api}users/`
export const userProfileUrl = `${usersUrl}userprofile/`

export const _GET_SKUS = () => {
  if (Platform.OS === 'android') {
    return ['']
  } else {
    return ['enbarr_premium_subcription', 'enbarr_platinum_subcription']
  }
}
