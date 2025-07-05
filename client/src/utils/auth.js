export const saveAuthData = (token, decodedUser) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(decodedUser));
};