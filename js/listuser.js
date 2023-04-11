import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { addCustomEventListener, goTo } from "./utils.js";

APIGet(ServiceURL.User.getAll).then(res => {
    let users = res.data.data;
    users.forEach(data => {
        // console.log(data);
        let user = document.createElement("li");
        user.classList.add("item", "d-flex", "justify-content-between", "align-items-center");
        user.innerHTML =
            `<div class="d-flex">
                <i class="fad fa-user me-3 my-auto"></i>
                <div>
                    <div>${data.user.name}</div>
                    <div>${data.user.role.name}</div>
                </div>
            </div>`;

        let editButton = document.createElement("button");
        editButton.setAttribute("type", "edit");
        editButton.innerHTML = `<i class="fad fa-edit"></i>`;
        editButton.classList.add("btn");
        user.appendChild(editButton);

        user.addEventListener("click", e => {
            goTo("./userdetail.html?id=" + data.user.id);
        })

        addCustomEventListener("edit", e => {
            goTo("./edituser.html?id=" + data.user.id);
        }, editButton)

        document.querySelector("#user-list").appendChild(user);
    });

})