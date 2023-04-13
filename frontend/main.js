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
        alert(response.message)
        console.log(response)
        localStorage.setItem("securityupf",response.token)
    })
    .catch((e) => {
        console.log(`Error -> ${e}`)
    })
}

function testJwt(){
    const token = localStorage.getItem("securityupf")
    console.log(token)
    fetch("http://localhost:3000/api/test",{
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`
        },
        body: JSON.stringify({
            student: "188765"
        })
    })
    .then((response) => response.json())
    .then((response) => {
        alert(response.message)
        console.log(response)
    })
    .catch((e) => {
        console.log(`Error -> ${e}`)
    })
}

function clearToken(){
    localStorage.removeItem("securityupf")
    alert("Removed with successfully")
}