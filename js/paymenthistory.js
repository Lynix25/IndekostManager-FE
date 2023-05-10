import { APIGet } from "./api.js";
import { PAGE, ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { addCustomEventListener, forEach, goBack, goTo, map, map2 } from "./utils.js";

APIGet(ServiceURL.Transaction.getAll(getCookie("id"))).then(res => {
    let transactions = res.data.data;
    console.log(transactions);

    document.querySelector("#paid-list").innerHTML =
        map(transactions, transaction => {
            APIGet(ServiceURL.Transaction.check(transaction.paymentId)).then(res => { console.log(res); })

            return `<li class="border rounded px-3 py-1 m-auto mb-2" data-id="${transaction.id}" type="transaction-detail">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <div class="order-room">Nama Kamar</div>
                <div class="order-date">1 Jan 2022</div>
            </div>
            <div class="badge badge-blue">Dalam Pengerjaan</div>
        </div>
        <hr style="margin: .5rem 0px;">
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                <div class="text-center">
                    <i class="fa-solid fa-toilet"></i>
                </div>
                <div class="">
                    <div>Sedot Toilet Mampet</div>
                    <div>Permintaan pengerjaan: 1/1/2022 19:00</div>
                </div>
            </div>
            <div class="">
                <button class="btn bg-primary">Komplain</button>
            </div>
        </div>
    </li>`})

    addCustomEventListener("transaction-detail", e => {
        let transactionId = e.detail.target.getAttribute("data-id");
        goTo(PAGE.PAYMENTDETAIL(transactionId));
    })
})

document.querySelector("#back").addEventListener("click", e => {
    goBack();
});