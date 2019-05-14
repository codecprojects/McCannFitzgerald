function checkPhoneNumber() {
    var phone = Xrm.Page.getAttribute('telephone1').getValue();

    if (phone === "" || phone === null) {
        alert("Phone number is null");
        Xrm.Page.ui.setFormNotification("Phone number is missing", "WARNING");
        Xrm.Page.getAttribute("telephone1").setValue('+353 (0)1 603 4300');
    }
}

function checkEmailAddress() {
    var email = Xrm.Page.getAttribute('emailaddress1').getValue();

    if (email === "" || email === null) {
        alert("Email field is null");
        Xrm.Page.ui.setFormNotification("Email is missing", "WARNING");
        Xrm.Page.getAttribute("emailaddress1").setValue('info@codec.ie');
    }
}