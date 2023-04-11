export function Toast(status, message) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        // "onCloseClick": function() { console.log('close button clicked'); },
        "showDuration": "300",
        "hideDuration": "10",
        "timeOut": "2000",
        "extendedTimeOut": "500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "rtl": false
      }
    return toastr[status](message, status.toUpperCase());
}