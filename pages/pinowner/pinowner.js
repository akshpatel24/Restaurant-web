let btn1 = document.getElementById('owning');

btn1.addEventListener('click', secondcheckown);
// make sure only owner has right
function secondcheckown(event) {            
    let pinnumber = document.getElementById('pinnumber').value;

    if (pinnumber == '13756421') {
        window.location.href = "../ownerinfo/owner.html"
    } else {
        alert('Verification failed. Please try again.');
    }
}