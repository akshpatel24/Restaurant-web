let userData = {};

function forgetpassword() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Input validation
    if (username === "" || password === "") {
        alert("Username and password cannot be left blank.");
        return;
    }

    // Add password strength check if needed
    // if (!isPasswordStrong(password)) {
    //     alert("Password is not strong enough. Please use a combination of uppercase, lowercase, numbers, and special characters.");
    //     return;
    // }
    fetch(`http://localhost:8083/reset?username=${username}&new_password=${password}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(data => {
        if(data.status == 200){
            alert('Password reset successful');
            console.log('Success:', data);
            window.location.href = "../login/login.html"; // Redirect to login page
        }
        else{
            alert('Password reset failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
    
}

// Uncomment and implement if you want to add password strength validation
// function isPasswordStrong(password) {
//     // Implement password strength logic
//     // Return true if password is strong, false otherwise
// }
