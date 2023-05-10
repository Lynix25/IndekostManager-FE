import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { UNIXtimeConverter, addCustomEventListener, getParamOnURL, map, map2, numberWithThousandsSeparators } from "./utils.js";

APIGet(ServiceURL.Transaction.check(getParamOnURL("id"))).then(res => {
    let response = res.data;
    console.log(response);
    document.querySelector(".frame").innerHTML = `
    <div>Status</div>
    <div class="d-flex justify-content-between">
        <div>Nomor Pembayaran</div>
        <div>INV/${UNIXtimeConverter(response.transaction.createdDate, "YYYYMMDD")}/MPL/${response.transaction.paymentId.substring(0, 8).toUpperCase()}</div>
    </div>
    <div class="d-flex justify-content-between">
        <div>Tanggal Transaksi</div>
        <div>${UNIXtimeConverter(response.transaction.createdDate, "D MMMM YYYY, hh:mm WIB")}</div>
    </div>
    <hr>
    <div>
        <div>
            Detail Pembayaran
        </div>
        ${map(response.transaction.taskItems, v =>
        `<div class="d-flex border rounded justify-content-between mb-3">
            <i class="fa-solid fa-house"></i>
            <div>
                <div>Nama Service</div>
                <div>${v.service.serviceName}</div>
            </div>
            <div>
                <div>Total Harga</div>
                <div>Rp ${numberWithThousandsSeparators(v.charge)}</div>
            </div>
        </div>`)}
        ${map(response.transaction.rentItems, v =>
        `<div class="d-flex border rounded justify-content-between mb-3">
            <i class="fa-solid fa-house"></i>
            <div>
                <div>Nama Service</div>
                <div>Keterangan</div>
            </div>
            <div>
                <div>Total Harga</div>
                <div>Rp 2.000.000</div>
            </div>
        </div>`)}
    </div>
    <hr>
    <div>
        <div>Rincian Pembayaran</div>
        <div class="d-flex justify-content-between">
            <div>Metode Pembayaran</div>
            <div>BCA Virtual Account</div>
        </div>
        <div class="d-flex justify-content-between">
            <div>Total Biaya</div>
            <div>Rp2.050.000</div>
        </div>
        <div class="d-flex justify-content-between">
            <div>Total Denda</div>
            <div>Rp0</div>
        </div>
        <div class="d-flex justify-content-between">
            <div>Total Tagihan</div>
            <div>Rp2.050.000</div>
        </div>
        <div class="d-flex justify-content-center">
            ${response.statusCode === "404" ? '<button type="create-payment" class="btn btn-primary">Bayar</button>' : ""}
        </div>
    </div>`;

    addCustomEventListener("create-payment", e => {
        window.snap.pay(response.transaction.token, {
            onSuccess: function (result) { alert('success'); console.log(result); },
            onPending: function (result) { alert('pending'); console.log(result); },
            onError: function (result) { alert('error'); console.log(result); },
            onClose: function () { alert('customer closed the popup without finishing the payment'); }
        });
    })
})