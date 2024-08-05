
let userData = {} // need to create object so it can allign as api udnerstands response in json


function loginUser() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const role = document.getElementById('role').value;

    userData = {
        username: username,
        password: password,
        role: role
    };
    // Input validation
    if (username === "" || password === "") {
        alert("Username and password cannot be left blank.");
        return;
    }


        fetch('http://localhost:8083/user/authenticate', {
            method: 'POST', // Use get for creating a new resource
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            //this is meant to parse the data.
        })

            .then(data => {
                // Optionally redirect to login page or perform other actions                        
                if(data.status == 200){
                    alert('login successful');
                    console.log('Success:', data);
                    // localStorage.setItem('username', username);
                    // localStorage.setItem('password', password);
                    // localStorage.setItem('role', role);




                    window.location.href = "../home/home.html"; // Redirect to login page
                    
                }

                else{
                    alert('login failed try again');
                }
                // Redirect to login page
            })
    }












