import { baseUrl } from "../Constants/urls"

export async function fetchWithTimeout(url, options = {}) {
  const { timeout = 30000 } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  return await fetch(`${baseUrl}${url}`, {
    ...options,
    signal: controller.signal
  })
    .then(response => {
      const statusCode = response.status
      const data = response.json()
      clearTimeout(id)
      return Promise.all([{ code: statusCode }, data])
    })
    .catch(error => {
      console.error(error)
      clearTimeout(id)
      const statusFailedCode = '000'
      return [
        {
          code: statusFailedCode,
          name: 'network error',
          description: error
        }
      ]
    })
}
