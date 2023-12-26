const formLogin = document.forms.loginForm;
const formLoginElements = formLogin.elements;
formLogin.addEventListener("submit", (e) => {
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
        getLoginRequest(userObject);
    }
});

function validation() {
    let status = true;
    for (let formLoginElement of formLoginElements) {
        if (formLoginElement.tagName === "INPUT") {
            formLoginElement.onfocus = () => {
                formLoginElement.parentElement.classList.remove("error");
                if (formLoginElement.classList.contains("form-login__password")) {
                    formLoginElement.parentElement.classList.remove("error-password");
                }
            }
            if (formLoginElement.value == false) {
                formLoginElement.parentElement.classList.add("error");
                status = false;
            }
            if (formLoginElement.classList.contains("form-login__password")) {
                if (formLoginElement.value.length < 6) {
                    formLoginElement.parentElement.classList.add("error-password");
                    status = false;
                }
            }
        }
    }
    return status;
}
function getUserObject(userObject) {
    Array.from(formLoginElements).forEach(formLoginElement => {
        if (formLoginElement.tagName === "INPUT") {
            const formRegisterElementName = formLoginElement.className.split("__").pop();
            userObject[formRegisterElementName] = formLoginElement.value;
        }
    });
    return userObject;
}

function getLoginRequest(userObject) {
    let createRequestPromise = new Promise((resolve, reject) => {
        // create body request
        const bodyRequest = JSON.stringify(userObject);

        // create headers
        const headersRequest = new Headers();
        headersRequest.append("Content-Type", "application/json");
        fetch("https://nestjs-boilerplate-test.herokuapp.com/api/v1/auth/email/login", {
            headers: headersRequest,
            method: "POST",
            body: bodyRequest
        }).then(responce => {
            if (responce.ok) resolve(responce.json());
            else reject(responce);
        }).catch(problem => reject(problem));
    })
    // responce
    createRequestPromise.then(Successfully, error)

    // Successfully
    function Successfully(data) {
        if (data) {
            document.querySelector(".loading").remove();
            document.body.style.overflow = "auto";
            openPopup("You are logged in");
            if (data.token) {
                localStorage.setItem("token", `${data.token}`);
                console.log(localStorage.getItem("token"));
            }

            // delete info in input
            for (let formLoginElement of formLoginElements) {
                if (formLoginElement.tagName === "INPUT") {
                    formLoginElement.value = "";
                }
            }

            // redirection
            location.href = "home.html";
        }
    }

    // error
    function error(dataError) {
        if (dataError.status === 422) {
            document.querySelector(".loading").remove();
            document.body.style.overflow = "auto";
            openPopup("Incorrect email or password");
        } else {
            openPopup("Something went wrong");
        }

        // delete info in input
        for (let formLoginElement of formLoginElements) {
            if (formLoginElement.tagName === "INPUT") {
                formLoginElement.value = "";
            }
        }
    }
}


// vasyaUpi2@gmail.com
// 123456