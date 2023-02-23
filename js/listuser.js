import { addCustomEventListener, APIGet, getCookie, goTo } from "./utils.js";

APIGet("/user").then(res => {
    let users = res.data.data;

    users.forEach(data => {
        console.log(data);
        let user = document.createElement("li");
        user.classList.add("item", "d-flex", "justify-content-between", "align-items-center");
        user.innerHTML =
            `<div class="d-flex">
                <i class="fad fa-user me-3 my-auto"></i>
                <div>
                    <div>${data.name}</div>
                    <div>${data.roleId}</div>
                </div>
            </div>`;

        let editButton = document.createElement("button");
        editButton.setAttribute("type", "edit");
        editButton.innerHTML = `<i class="fad fa-edit"></i>`;
        editButton.classList.add("btn");
        user.appendChild(editButton);

        user.addEventListener("click", e => {
            goTo("./userdetail.html?id=" + data.id);
        })

        addCustomEventListener("edit", e => {
            goTo("./edituser.html?id=" + data.id);
        }, editButton)

        document.querySelector("#user-list").appendChild(user);
    });

})