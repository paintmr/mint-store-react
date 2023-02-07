const headers = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})

export const get = (url) => {
  return fetch(url, { method: 'GET', headers })
    .then(
      (response) => {
        return handleResponse(response, url)
      }
    )
    .catch(
      (error) => {
        console.error(`Request failed. URL=${url}. Message=${error}`)
        return Promise.reject({ error: { message: 'Request failed.' } })
      }
    )
}

const handleResponse = (response, url) => {
  if (response.status === 200) {
    return response.json()
  } else {
    console.error(`Request failed. URL=${url}`)
    return Promise.reject({ error: { message: 'Request failed due to sever error.' } })
  }
}

