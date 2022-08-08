async function loginInPage(email, password) {
  const url = "https://comedor-unmsm-api.herokuapp.com/login/get-token";
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", email);
  formData.append("password", password);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });
  return response;
}
export { loginInPage };
