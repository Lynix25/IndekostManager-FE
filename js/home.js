import { APIGet } from "./api.js";
import { getCookie } from "./cookiemanagement.js";
import { ServiceURL } from "./config.js";
import { UNIXtimeConverter, numberWithThousandsSeparators } from "./utils.js";

APIGet(ServiceURL.Transaction.unpaid(getCookie("id"))).then(res => {
    let data = res.data;

    document.querySelector(".unpaid-total").innerHTML = numberWithThousandsSeparators(data.unpaidTotal);
    document.querySelector(".due-date").innerHTML = UNIXtimeConverter(data.maxDueDate, "DD MMMM YYYY");
})