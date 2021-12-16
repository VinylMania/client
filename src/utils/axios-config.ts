const provideConfig = (): {
  headers: {
    'Content-Type': string
    Authorization: string
  }
} => {
  const privateToken = localStorage.token ? localStorage.token : ''
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
  }
  if (localStorage.token) {
    config.headers.Authorization = `Bearer ${privateToken}`
  }
  return config
}

export default provideConfig
