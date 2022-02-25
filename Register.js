function Register() {
    const new_password = document.getElementById("new_password").value;
    const repeated_password = document.getElementById("password_repeated").value;
    if (new_password !== repeated_password) {
        alert("The password fields not matching!!")

    } else {
        const user_info = {
            "name": document.getElementById("username").value,
            "E-mail": document.getElementById("e-mail").value,
            "password": new_password
        }
        if (user_info["name"] !== "" || user_info["E-mail"] !== "") {
            localStorage.setItem("user_info", JSON.stringify(user_info))
            localStorage.setItem("OpenWay", "Register")
            window.location.href = "TODO.html"

        } else {
            alert("Missing username or e-mail address")
        }


    }
    
}