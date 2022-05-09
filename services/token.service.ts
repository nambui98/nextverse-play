export function getLocalAccessToken() {
  const userStr = localStorage.getItem("user")
  let user = null
  if (userStr) {
    user = JSON.parse(userStr)
  }

  return user?.accessToken
}

export function getLocalRefreshToken() {
  const userStr = localStorage.getItem("user")
  let user = null
  if (userStr) {
    user = JSON.parse(userStr)
  }

  return user?.refreshToken;
}

export function updateLocalRefreshToken(token: string) {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    let user = JSON.parse(userStr);
    user.refreshToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    let user = {
      refreshToken: token
    }
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export function updateLocalAccessToken(token: string) {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    let user = JSON.parse(userStr);
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    let user = {
      accessToken: token
    }
    localStorage.setItem("user", JSON.stringify(user));
  }
}