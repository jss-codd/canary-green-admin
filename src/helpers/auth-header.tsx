const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("canary_user") || '{}');
    if (user && user.token) {
      return { "x-access-token": user.token };
    } else {
      return {"x-access-token": ""};
    }
  };
  
  export { authHeader };