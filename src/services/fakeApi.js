// The reason for developing this fake api, is servers being unavailable at the moment. it will deleted at the end

export const fakeLogin = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.username === 'demo' && credentials.password === 'password') {
        resolve({ message: 'Login successful' })
      } else {
        reject({ message: 'Invalid credentials' })
      }
    }, 1000)
  })
}

export const fakeSignUp = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.email === 'demo@example.com') {
        reject({ message: 'Email already exists' })
      } else {
        resolve({ message: 'Registration successful' })
      }
    }, 1000)
  })
}
