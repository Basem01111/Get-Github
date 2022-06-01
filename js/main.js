/* click Submit*/
let subLvOne = document.querySelector("section.level-one .form-search .sub"),
    secLvOne = document.querySelector("section.level-one"),
    secLvTwo = document.querySelector("section.level-two "),
    secOneForm = document.querySelector("section.level-one .form-search "),
    inpLvOne = document.querySelector(
        "section.level-one .form-search .main-input"
    );
// check Input
subLvOne.addEventListener("click", function (evt) {
    evt.preventDefault();

    if (inpLvOne.value.length > 0) {
        let inpValue = inpLvOne.value,
            xhr = new XMLHttpRequest();
        xhr.open("GET", `https://api.github.com/users/${inpValue}/repos`);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                let data = JSON.parse(xhr.responseText);
                if (data.length >= 1) {
                    secLvOne.classList.add("d-none");
                    secLvTwo.classList.remove("d-none");
                    let SecTwoName = document.querySelector(
                            "section.level-two .info .name"
                        ),
                        SecTwoImg = document.querySelector(
                            "section.level-two .info img"
                        ),
                        SecTwoUrl = document.querySelector(
                            "section.level-two .info .url"
                        );

                    SecTwoName.textContent = inpValue;
                    SecTwoUrl.setAttribute("href", data[0].owner.html_url);
                    SecTwoImg.setAttribute("src", data[0].owner.avatar_url);
                    let SecTwoBack = document.querySelector(
                        "section.level-two .back"
                    );
                    SecTwoBack.addEventListener("click", () => {
                        secLvOne.classList.remove("d-none");
                        secLvTwo.classList.add("d-none");
                    });
                    let secLvTwoRow = document.querySelector(
                        "section.level-two .row"
                    );
                    if (secLvTwoRow.children) {
                        console.log(secLvTwoRow.children);
                        [...secLvTwoRow.children].forEach(function (e) {
                            e.remove();
                        });
                    }
                    for (let i = 0; i < data.length; i++) {
                        let divCol = document.createElement("div"),
                            divBox = document.createElement("div"),
                            divIGit = document.createElement("i"),
                            divName = document.createElement("div"),
                            textName = document.createTextNode(" أسم المشروع:"),
                            spanName = document.createElement("span"),
                            textSpan = document.createTextNode(data[i].name),
                            aUrl = document.createElement("a"),
                            textUrl = document.createTextNode(
                                "أذهب للريبو علي الجيت هب"
                            ),
                            iUrl = document.createElement("i");

                        divCol.appendChild(divBox);
                        divBox.appendChild(divIGit);
                        divBox.appendChild(divName);
                        divName.appendChild(textName);
                        divName.appendChild(spanName);
                        spanName.appendChild(textSpan);
                        divBox.appendChild(aUrl);
                        aUrl.appendChild(textUrl);
                        aUrl.appendChild(iUrl);
                        divCol.classList.add("col-md-6", "col-xl-4");
                        divBox.classList.add("box");
                        divIGit.classList.add("i-git", "fab", "fa-github");
                        divName.classList.add("name");
                        aUrl.setAttribute("href", data[i].html_url);
                        aUrl.setAttribute("target", "_blank");
                        aUrl.classList.add("url");
                        iUrl.classList.add("fas", "fa-angle-left");
                        secLvTwoRow.appendChild(divCol);
                    }
                } else {
                    let secOneError = document.querySelector(
                        "section.level-one .form-search .error"
                    );
                    secOneError.remove();
                    let elmErrorLen = document.createElement("div"),
                        texError = document.createTextNode(
                            "هذا الحساب لا يحتوي علي مستودعات  "
                        );
                    elmErrorLen.appendChild(texError);
                    elmErrorLen.classList.add("error");
                    inpLvOne.after(elmErrorLen);
                }
            } else if (xhr.status === 404 && xhr.readyState === 4) {
                let secOneError = document.querySelector(
                    "section.level-one .form-search .error"
                );
                secOneError.remove();
                let elmErrorFound = document.createElement("div"),
                    texError = document.createTextNode(
                        "لا يوجد حساب بهذا الأسم  "
                    );
                elmErrorFound.appendChild(texError);
                elmErrorFound.classList.add("error");
                inpLvOne.after(elmErrorFound);
            }
        };
    } else {
        let secOneError = document.querySelector(
            "section.level-one .form-search .error"
        );
        secOneError.remove();
        let elmErrorName = document.createElement("div"),
            texError = document.createTextNode("يجب إدخال الاسم");
        elmErrorName.classList.add("error");
        elmErrorName.appendChild(texError);
        inpLvOne.after(elmErrorName);
    }
});
