// const App_Domain = 'https://tiny-bird-36835.botics.co';
const App_Domain = 'https://stagging.enbarrapp.com';
//'https://enbarrapp.com';

export async function fetchWithTimeout(url, options = {}) {
  const { timeout = 30000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  return await fetch(`${App_Domain}${url}`, {
    ...options,
    signal: controller.signal,
  })
    .then(response => {
      const statusCode = response.status;
      const data = response.json();
      clearTimeout(id);
      return Promise.all([{ code: statusCode }, data]);
    })
    .catch(error => {
      console.error(error);
      clearTimeout(id);
      const statusFailedCode = '000';
      return [
        {
          code: statusFailedCode,
          name: 'network error',
          description: error,
        },
      ];
    });
}
