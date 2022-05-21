const apiUrl = "http://localhost:8080/iemdb_war/";
const baseUrl = "http://localhost:9500/";
(async function athenticate() {
    const response = await fetch(apiUrl + 'users/auth_callback' + window.location.search);
    const JWT = (await response.json())["JWT"];
    localStorage.setItem("JWT", JWT);
    location.href = baseUrl;
})();