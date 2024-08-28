// let username = document.getElementById("username");
// let password = document.getElementById("password");
// let role = document.getElementById("role");
//let signup = document.getElementById("signup");
// let userData = {} // need to create object so it can allign as api udnerstands response in json
// signup.addEventListener("click", createUser);
// {
// }

function createUser() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const role = document.getElementById('role').value;

    userData = {
        username: username,
        password: password,
        role: role
    };


    // Input validation
    if (username ==="" || password === "" || role==="") {
        alert("Username and password cannot be left blank.");
        return;
    }


    fetch('http://localhost:8083/user', {
        method: 'POST', // Use POST for creating a new resource
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
         if(response.status==200)                           // console.log('Success:', data);
            alert('User successfully!');
        // Optionally redirect to login page or perform other actions        
            window.location.href = "../login/login.html"; // Redirect to login page
    })

    // .catch((error) => {
    //     console.log('Error:', error);
    //     alert(error.message || 'An unexpected error occurred.');
    // });
}











