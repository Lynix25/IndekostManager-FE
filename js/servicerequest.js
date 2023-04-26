import { APIGet, APIPost } from "./api.js";
import { Constant, Event, ServiceURL } from "./config.js";
import { getFormValue, goBack, goTo, handleFormSubmited, numberWithThousandsSeparators } from "./utils.js";
import { Toast } from "./component/toast.js";

// $(document).ready(() => {
// $('.date')
// // document.getElementsByClassName('date')
// // document.getElementById("datepicker")
// // document.querySelector('.date')
// // document.querySelector('#datepicker')
// .datepicker({
//     format: "dd/mm/yyyy",
//     // format: {
//     //     toDisplay: function (date, format, language) {
//     //         var d = new Date(date);
//     //         console.log("toDisplay " + d.getTime())

//     //         d.setDate(d.getDate() - 7);
//     //         return d;
//     //     },
//     //     toValue : function (date, format, language) {
//     //         console.log("toValue " + date)
//     //         var d = new Date(date);
//     //         d.setDate(d.getDate() + 7);
//     //         // return new Date(d);
//     //         return date;
//     //     }
//     // },
//     todayHighlight: true,
//     todayBtn: "linked",
//     autoclose: true,
//     changeDate: (e) => {
//         console.log(e);
//     }
// })
// .on("hide", function (e) {
//     console.log(e)
// }).on("changeDate", e => {
//     console.log(e);
// })

handleFormSubmited((e) => {
    let data = getFormValue(e.target);
    data["taskDate"] = new Date(data.taskDate).getTime();
    delete data.category;
    APIPost(ServiceURL.Task.create, data).then(response => {
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
        setTimeout(function() { goTo('./requesthistory.html') }, Event.timeout);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    });
});

let serviceList;
let filteredServiceList = {};

APIGet(ServiceURL.Service.getAll).then(res => {
    serviceList = res.data.data;
    
    serviceList.forEach(service => {
        if (service.serviceName in filteredServiceList) {
            filteredServiceList[service.serviceName].push(service);
        }
        else {
            filteredServiceList[service.serviceName] = [];
            filteredServiceList[service.serviceName].push(service);
        }
    });

    setService(filteredServiceList);
}).catch(err => {
    console.log(err);
})

document.querySelector("#category").addEventListener("change", e => {
    let selected = e.target.value;
    setVariant(filteredServiceList[selected]);
})

document.querySelector("#serviceId").addEventListener("change", e => {
    let selected = e.target.value;
    let selectedCategory = document.querySelector("#category").value;
    filteredServiceList[selectedCategory].forEach(service => {
        // console.log(service);
        if (service.id === selected) {
            updatePrice(service.price);
        }
    })
})

// })

function setService(objectOptions) {
    let selection = document.querySelector("#category");
    let firstCategory = undefined;
    Object.keys(objectOptions).forEach(serviceCategory => {
        if (firstCategory === undefined) firstCategory = serviceCategory;
        let option = document.createElement("option");
        option.innerHTML = serviceCategory;
        option.setAttribute('value', serviceCategory);
        selection.appendChild(option);
    })
    setVariant(objectOptions[firstCategory]);
}

function setVariant(ArrayOptions) {
    let variant = document.querySelector("#serviceId");
    let firstPrice = undefined;
    variant.innerHTML = "";
    ArrayOptions.forEach(service => {
        if (firstPrice === undefined) firstPrice = service.price;
        let option = document.createElement("option");
        option.innerHTML = service.variant;
        option.setAttribute('value', service.id);
        variant.appendChild(option);
    })
    updatePrice(firstPrice);
}

function updatePrice(price) {
    if (price) {
        document.querySelector("#price").parentNode.style.display = "block";
        document.querySelector("#price").innerHTML = "Rp " + numberWithThousandsSeparators(price);
    }
    else {
        document.querySelector("#price").parentNode.style.display = "none";
    }
}

document.querySelector("#back").addEventListener("click", e => {
    goBack();
})