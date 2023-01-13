import { getFormValue, handleFormSubmited } from "./utils.js";
$(document).ready(() => {
    $('.date')
    // document.getElementsByClassName('date')
    // document.getElementById("datepicker")
    // document.querySelector('.date')
    // document.querySelector('#datepicker')
    .datepicker({
        format: "dd/mm/yyyy",
        // format: {
        //     toDisplay: function (date, format, language) {
        //         var d = new Date(date);
        //         console.log("toDisplay " + d.getTime())

        //         d.setDate(d.getDate() - 7);
        //         return d;
        //     },
        //     toValue : function (date, format, language) {
        //         console.log("toValue " + date)
        //         var d = new Date(date);
        //         d.setDate(d.getDate() + 7);
        //         // return new Date(d);
        //         return date;
        //     }
        // },
        todayHighlight: true,
        todayBtn: "linked",
        autoclose: true,
        changeDate: (e) => {
            console.log(e);
        }
    })
    .on("hide", function (e) {
        console.log(e)
    }).on("changeDate", e => {
        console.log(e);
    })

    handleFormSubmited((e) => {
        let data = getFormValue(e.target);
        console.log(data);
    })
})

