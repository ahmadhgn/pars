console.log("LOGIN JS LOADED");
document
    .getElementById(
        "loginForm"
    )
    .addEventListener(
        "submit",

        async function (e) {

            e.preventDefault();

            const username =
                document
                    .getElementById(
                        "username"
                    ).value;

            const password =
                document
                    .getElementById(
                        "password"
                    ).value;
            console.log("LOGIN CLICKED");
            const response =
                await fetch(
                    "/auth/login",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                username,
                                password
                            })
                    }
                );

            const result =
                await response.text();

            if (
                result ===
                "LOGIN_SUCCESS"
            ) {

                window.location =
                    "/index.html";
            }
            else {

                alert(result);
            }
        }
    );