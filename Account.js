/* Requirements:
	- Check box and click on an Organization 
	- Check if field “Main Address Same as Organisation Address” equal true
	- OnChange of Address from Company get the information from the field
	  and copy to address street 1, address street 2, 

JS
 - Retrieve Organisation Address selected record
 - Get the attributes from Organisation Address
 - Set the attributes into Individuals */

//	Checkbox -  WORKING
function checkBoxSelection() {
    var checkbox = Xrm.Page.getAttribute('gf_areyouamemberofanorganisation').getValue();

    // If user has checked box, display a message
    if (checkbox != true) {
        alert("Select checkbox if you are member of a Organisation");
    }
    else {
    }
}

//	Click on Organisation (Lookup) -  WORKING
function clickOnOrganisation() {
    var LookupField = Xrm.Page.getAttribute("gf_organisation").getValue();

    if (LookupField === null) {
        alert("Please select Organisation in Lookup field");
    }
    else {
    }
}

// Check if 'Main Address'(Contact) is different from Organisation address(Account)
function compareAddressFieldsAndUpdate() {
    var contactAddress = Xrm.Page.getAttribute('address1_composite').getValue();
    var accountAddress = Xrm.Page.getAttribute('gf_organisation').getValue(); // LookupField

    if (accountAddress !== null) { // Checking to make sure we have a valid Value

        if (accountAddress[0].entityType == "account") {

            var accountId = accountAddress[0].id;

            var serverUrl = Xrm.Page.context.getClientUrl();
            var oDataSelect = serverUrl +
                "/XRMServices/2011/OrganizationData.svc/AccountSet(guid'" + accountId + '")?
            $select = address1_composite";

            var request = new XMLHttpRequest();
            request.open("GET", oDataSelect, false); // false = synchronous, true asynchronous"
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        var check = JSON.parse(request.responseText).d;
                        // Change form data
                        Xrm.Page.getAttribute("address1_composite").setValue(check.new.address1_composite);

                    }
                }
            };
            request.send();
        }
    }
};

// Aventure Works (Account) - 20 Old Bundoran Road, Rathbraughan, Sligo Town, Co. Sligo
console.log(contactAddress);  // 20 Old Bundoran Road, Rathbraughtan, Sligo Town, Co. Sligo
console.log(accountAddress);	//3 Hatch Lane, Adelaide Street, Dublin2, Dublin (Codec dss Account):
console.log(accountAddress[0]);	//3 Hatch Lane, Adelaide Street, Dublin2, Dublin (Codec dss Account):
console.log(accountAddress[0].Individualsin)
if (contactAddress !== accountAddress[0].address1_composite) {
    alert("Address has been changed");
}
}

// Triggered at 'Onchange' Event: Get and Set Values in Address fields
function GetSetMultipleRecords() {

    // Fetch XML Query to check if both composite Addressess (Contact: Address 1, Account: Address 1) contain data
    var fetch = "<fetch version="1.0" output-format="xml - platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name" /><attribute name="primarycontactid" /><attribute name="telephone1" /><attribute name="accountid" /><order attribute="name" descending="false" /><filter type="and"><condition attribute="address1_composite" operator="not - null" /></filter><link-entity name="contact" from="gf_organisation" to="accountid" link-type="inner" alias="ac"><filter type="and"><condition attribute="address1_composite" operator="not - null" /></filter></link-entity></entity></fetch>";

    // Pass in the data from fetch query
    var OrganisationCompositeAddress = Xrm.WebApi.retrieveMultipleRecords("account", fetch).then(

        // If there is data sent back
        function success(result) {
            for (var i = 0; i < result.entities.length; i++) {
                console.log(result.entities[i]);
            }
            // perform additional operations on retrieved records 

        },

        function (error) {
            console.log(error.message);
        }
    );
}
