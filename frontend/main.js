function login(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch("http://localhost:3000/api/authenticate",{
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
    .then((response) => response.json())
    .then((response) => {
        console.log(response)
        localStorage.setItem("securityupf",response.token)
    })
    .catch((e) => {
        console.log(`Error -> ${e}`)
    })
}