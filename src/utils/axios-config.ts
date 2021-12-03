const provideConfig = (): {
  headers: {
    'Content-Type': string;
    'x-auth-token': string;
  };
} => {
  const privateToken = localStorage.token ? localStorage.token : '';
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': privateToken,
    },
  };
  return config;
};

export default provideConfig;
