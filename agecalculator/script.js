function calculateAge() {

    let dob = document.getElementById("dob").value;
    let result = document.getElementById("result");
    if (dob === "") {
        result.innerText = "Please select your date of birth";
        return;
    }
    let birthDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (
        month < 0 ||
        (month === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }
    result.innerText = `Your age is ${age} years 🎉`;
}