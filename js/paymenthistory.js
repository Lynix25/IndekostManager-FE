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

            return `<li class="border rounded px-3 py-1 m-auto">
                        <div class="d-flex justify-content-between">
                            <div class="fw-bold">INV</div>
                            <div class="badge badge-blue">Dalam Pengerjaan</div>
                        </div>
                        <div class="d-flex flex-column justify-content-between flex-lg-row align-items-lg-center">
                            <div>
                                <div class="d-flex justify-content-between">
                                    <div>Tagihan dibuat pada</div>
                                    <div>12 Mei 2023 15:13</div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div>Tagihan dibayar pada</div>
                                    <div>12 Mei 2023 15:13</div>
                                </div>
                            </div>
                            <div class="text-center">
                                x Layanan lainnya
                            </div>
                        </div>
                        <hr style="margin: .5rem 0px;">
                        <div class="d-flex justify-content-between">
                            <div>Total</div>
                            <div>Rp xxx.xxx</div>
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