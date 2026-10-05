function checkPassword() {

    let password = document.getElementById("password").value;
    let result = document.getElementById("result");

    if (password.length < 6) {
        result.innerText = "❌ Weak Password";
    } 
    else if (
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*]/.test(password)
    ) {
        result.innerText = "✅ Strong Password";
    } 
    else {
        result.innerText = "⚠️ Medium Password";
    }
}