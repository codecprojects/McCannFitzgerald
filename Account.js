function checkPhoneNumber() {
    //debugger;
    var phone = Xrm.Page.getAttribute('telephone1').getValue();

    if (phone === "" || phone === null) {
        alert("Phone number is null");
        Xrm.Page.ui.setFormNotification("Phone number is missing", "INFORMATION");
        Xrm.Page.getAttribute("telephone1").setValue('00353 - 089 0077007');
    }
}

function checkEmailAddress() {
    //debugger;
    var email = Xrm.Page.getAttribute('emailaddress1').getValue();

    if (email === "" || email === null) {
        alert("Email field is null");
        Xrm.Page.ui.setFormNotification("Email is missing", "WARNING");
        Xrm.Page.getAttribute("emailaddress1").setValue('gforde@codec.ie');
    }
}