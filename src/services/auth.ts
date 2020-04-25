// Fake API

interface SignInResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<SignInResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'sha9t23784jasdasghdyuh2374t60dfbhyasasd6aysnq3u',
        user: {
          name: 'Douglas',
          email: 'douglas@app.com',
        },
      });
    }, 2000);
  });
}
