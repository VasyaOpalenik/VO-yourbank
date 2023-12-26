const formRegister = document.forms.registerForm;
const formRegisterElements = formRegister.elements;
formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(validation());
    if (validation()) {
        console.log("1234");
        const userObject = getUserObject(new Object());
        document.body.insertAdjacentHTML("afterbegin", `
        <div class="loading">
        <img class="loading-image" src="img/register/loading.gif" alt="loading">
        </div>
        `);
        document.body.style.cssText = `
        overflow: hidden;
        `;
        getRequestRegister(userObject);
    }
});

function validation() {
    let status = true;
    for (let formRegisterElement of formRegisterElements) {
        if (formRegisterElement.tagName === "INPUT") {
            formRegisterElement.onfocus = () => {
                formRegisterElement.parentElement.classList.remove("error");
                if (formRegisterElement.classList.contains("form-login__password")) {
                    formRegisterElement.parentElement.classList.remove("error-password");
                }
            }
            if (formRegisterElement.value == false) {
                formRegisterElement.parentElement.classList.add("error");
                status = false;
            }
            if (formRegisterElement.classList.contains("form-login__password")) {
                if (formRegisterElement.value.length < 6) {
                    formRegisterElement.parentElement.classList.add("error-password");
                    status = false;
                }
            }
        }
    }
    return status;
}
function getUserObject(userObject) {
    Array.from(formRegisterElements).forEach(formRegisterElement => {
        if (formRegisterElement.tagName === "INPUT") {
            const formRegisterElementName = formRegisterElement.className.split("__").pop();
            userObject[formRegisterElementName] = formRegisterElement.value;
        }
    });
    return userObject;
}

function getRequestRegister(userObject) {
    console.log(userObject);
    // create promise
    const promise = new Promise((resolve, reject) => {
        // create body request
        let bodyRequest = JSON.stringify(userObject);

        // create headers   
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        // satings and get request
        fetch("https://nestjs-boilerplate-test.herokuapp.com/api/v1/auth/email/register", {
            method: "POST",
            body: bodyRequest,
            headers: headers,
            redirect: 'follow'
        })
            .then((responce => {
                if (responce.ok) resolve(true);
                else reject(responce);
            }))
            .catch(error => reject(error))
    })

    // Processing responce
    promise.then(wellRequest, badRequest);
    function wellRequest(data) {
        if (data) {
            document.querySelector(".loading").remove();
            document.body.style.overflow = "auto";
            openPopup("You are registered");

            // delete info in input
            for (let formRegisterElement of formRegisterElements) {
                if (formRegisterElement.tagName === "INPUT") {
                    formRegisterElement.value = "";
                }
            }
        }
    }
    function badRequest(data) {
        if (data.status === 422) {
            document.querySelector(".loading").remove();
            document.body.style.overflow = "auto";
            openPopup("This email is already taken");
        } else {
            openPopup("Something went wrong");
        }

        // delete info in input
        for (let formRegisterElement of formRegisterElements) {
            if (formRegisterElement.tagName === "INPUT") {
                formRegisterElement.value = "";
            }
        }
    }
}

// {
//   "email": "user12345@example.com",
//   "password": "userPassword",
//   "firstName": "John",
//   "lastName": "Doe"
// }