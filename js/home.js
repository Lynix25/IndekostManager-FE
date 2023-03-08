import { APIGet, getCookie, numberWithThousandsSeparators, UNIXtimeConverter } from "./utils.js";

APIGet("/transaction/unpaid/" + getCookie("tokens")).then(res => {
    let data = res.data;

    document.querySelector(".unpaid-total").innerHTML = numberWithThousandsSeparators(data.unpaidTotal);
    document.querySelector(".due-date").innerHTML = UNIXtimeConverter(data.maxDueDate, "DD MMMM YYYY");
})