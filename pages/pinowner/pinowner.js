let btn1 = document.getElementById('owning');
let pinnumber=document.getElementById('pinnumber').value

btn1.addEventListener('click', secondpinreset);
function secondpinreset() {
     pinnumber = atob('MjAwMQ=='); // This is base64 encoded '2001'

    let pinnumber2=pinnumber
    let enteredPin = prompt("Enter PIN number");
    if (pinnumber ==pinnumber2 && enteredPin==pinnumber) {
        alert('Password login successful!');
        window.location.href = "../ownerinfo/owner.html";
    } else {
        alert('Password login failed. Please try again.');
    }
}


