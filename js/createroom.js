import { addCustomEventListener, APIPost, forEach, getFormValue, handleFormSubmited, numberWithThousandsSeparators } from "./utils.js";

handleFormSubmited(e => {
    let data = getFormValue(e.target, { "name": "details", "separator": "_" });
    console.log(data);
    // APIPost("/room", data).then(res => {
    //     console.log(res);
    // })
})

// document.addEventListener("click", e => {
//     let elementTag = e.target.tagName;
//     if (elementTag !== "BUTTON") return;

//     let defaultType = ["button", "submit", "reset"]
//     let type = e.target.getAttribute('type');
//     console.log("checking type");
//     if(defaultType.includes(type)) {
//         console.log(e);
//         return;
//     }

//     const event = new Event(type);
//     e.target.dispatchEvent(event);
//     console.log("finish");
// })

let addRoomDetailButton = document.querySelector("button[type='add-price-detail']");
addCustomEventListener('add-price-detail', e => {
    document.querySelector("#addRoomPrice button[type='submit']").removeAttribute("hidden");

    let updateButton = document.querySelector("#addRoomPrice button[type='update']");
    updateButton.setAttribute("hidden", "");

    let title = document.querySelector("#addRoomPriceLabel");
    title.innerHTML = "Price Detail";
}, addRoomDetailButton)

let updateRoomDetailButton = document.querySelector("#addRoomPrice button[type='update']");
addCustomEventListener('update', e => {
    let form;
    e.path.forEach(element => {
        if (element.tagName == "FORM") {
            form = element;
        }
    });
    let data = getFormValue(form);
    let index = e.target.getAttribute('data');
    let row = document.querySelector("table").rows[index];
    row.querySelector(`[name='capacity_${index}']`).innerHTML = data.capacity + " Orang";
    row.querySelector(`[name='price_${index}']`).innerHTML = data.price;
    form.reset();
}, updateRoomDetailButton)

document.querySelector("#addRoomPrice #price").addEventListener('input', e => {
    e.target.value = numberWithThousandsSeparators(e.target.value)
})

handleFormSubmited(e => {
    console.log("#addRoomPrice submit event triggered", e.type);
    let data = getFormValue(e.target);
    if (data == null) return;

    let table = document.querySelector("table tbody");
    let newRow = table.insertRow();
    newRow.innerHTML = `<td>
    <div input name="capacity_${table.rows.length}" value=${data.capacity}>${data.capacity} Orang</div>
</td>
<td>
    <div input name="price_${table.rows.length}" value="${data.price.replaceAll(".","")}">${data.price}</div>
</td>`;

    let editDetail = document.createElement("button");
    editDetail.classList.add("btn")
    editDetail.setAttribute("data-bs-toggle", "modal");
    editDetail.setAttribute("data-bs-target", "#addRoomPrice");
    editDetail.setAttribute("data", table.rows.length)
    editDetail.innerHTML = `<i class="fa fa-edit"></i>`;

    let cell = newRow.insertCell();
    cell.appendChild(editDetail);
    addCustomEventListener("edit", e => {
        document.querySelector("#addRoomPrice button[type='update']").removeAttribute("hidden");

        let submitButton = document.querySelector("#addRoomPrice button[type='submit']");
        submitButton.setAttribute("hidden", "");

        let title = document.querySelector("#addRoomPriceLabel");
        title.innerHTML = "Update Price Detail";

        document.querySelector("#capacity").value = data.capacity;
        document.querySelector("#price").value = data.price;

        document.querySelector("#addRoomPrice button[type='update']").setAttribute("data", e.target.getAttribute("data"))

    }, editDetail)

    let deleteDetail = document.createElement("button");
    deleteDetail.classList.add("btn")
    deleteDetail.setAttribute("data", table.rows.length)
    deleteDetail.innerHTML = `<i class="fa fa-trash">`;

    cell = newRow.insertCell();
    cell.appendChild(deleteDetail);
    addCustomEventListener("delete", e => {
        let index;
        let row = e.target;
        let table = document.querySelector("table")
        forEach(table.rows, (ro, e) => {
            if (e == row) console.log(e, row)
        })
        // table.deleteRow(index);
    }, deleteDetail);
}, "#addRoomPrice")

// let addFaciltyButton = document.querySelector("button[type='add-facility']");
// addCustomEventListener('add-facility', e => {
// console.log(e);
// document.querySelector("#addRoomPrice button[type='submit']").removeAttribute("hidden");

// let updateButton = document.querySelector("#addRoomPrice button[type='update']");
// updateButton.setAttribute("hidden", "");

// let title = document.querySelector("#addRoomPriceLabel");
// title.innerHTML = "Price Detail";
// }, addFaciltyButton)

handleFormSubmited(e => {
    let data = getFormValue(e.target);
    console.log(document.querySelector("#addFacility button[type='submit']"));
    if (data.facility == "") return;
    // data-bs-dismiss="modal"
    document.querySelector("#addFacility button[type='submit']").setAttribute("data-bs-dismiss", "modal");
    let facilities = document.querySelector('.facilities');

    let facility = document.createElement('li');
    facility.setAttribute("input", "");
    facility.setAttribute("name", "facility");
    facility.innerHTML = data.facility;
    facilities.append(facility);

}, "#addFacility")