/* Requirements:
	1 - Check box and click on an Organization  ( DONE)
	2 - Check if field “Main Address Same as Organisation Address” equal true   (DONE)
	3 - OnChange of Address from Company get the information from the field (part done)
	  and copy to address street 1, address street 2, 

JS
 3(a)- Retrieve Organisation Address selected record    (DONE)
 3(b)- Get the attributes from Organisation Address (DONE)
 3(c)- Set the attributes into Individuals (not done)*/

// [1(a)]
function CheckBoxSelection() { 
    var checkbox = Xrm.Page.getAttribute('gf_checkboxselection').getValue();

    if (checkbox !== true) {
        setTimeout(function () { alert("Select checkbox if you are member of an Organisation"); }, 3000); //displays msg in 5 seconds
        console.log("Checkbox is not selected!");
    }
    else {
        console.log("Checkbox has been selected!");

    }
}

//	[1(b)]
function ClickOnOrganisation() {
    var LookupField = Xrm.Page.getAttribute("parentcustomerid").getValue();

    if (LookupField === null) {
        setTimeout(function () { alert("Select Organistion from the Lookup field"); }, 3000);
        console.log("Organisation has not been selected from Lookup field");
    }
    else {
        console.log("The selected Organisation is :", LookupField[0].name);
    }
}

// [2] & [3]
function RetrieveRecord() {
    alert("Retrieving Account Information"); // Notication of funcion starting

    // Retrieving GUID of Parent Entity from lookup field to use for searching for related Account
    var accountLookupGUID = Xrm.Page.data.entity.attributes.get("parentcustomerid").getValue()[0].id;
    // Retrieving the new 'Contact 'Address to compare with 'Account' Address
    var updatedContactAddress = Xrm.Page.data.entity.attributes.get("address1_composite").getValue();
    console.log("Updated Contact address is" + updatedContactAddress);

    // Calling function and passing GUID to retrieve data using OData filter operators [3(a)]
    Xrm.WebApi.retrieveRecord("account", accountLookupGUID, "$select=name, address1_composite, _ownerid_value")
        .then(function (result) { // Assigning retrieved data into variables    [3(b)]
            var accountName = result["name"];
            var accountAddress = result["address1_composite"];
            var ownerid = result["_ownerid_value"];

            // Displaying data to console
            console.log("Account name is : " + accountName)
            console.log("Account Address is : " + accountAddress);
            console.log("Account Lookup GUID is : " + accountLookupGUID);
            console.log("Account owner id is : " + ownerid);
            console.log("Updated Contact Address is : " + updatedContactAddress);

            // Compare Address fields for any change - [2]
            if (updatedContactAddress !== accountAddress) { // If Addresses are different
                // Clearing Contact address fields
                Xrm.Page.getAttribute('address1_composite').setValue(null); // Clear

                // Assigning 'Account' address into the 'Contact' address fields    -  [3(c)]
                Xrm.Page.getAttribute('address1_composite').setValue(accountAddress);
            }
            else {
                console.log("Address is the same as previous");
            }
        })
        .fail(function (error) {
            var message = error.message;
            // Error Handling
            console.log(message);
        });
}

// Display Lookup details from Contact form - TESTING
function DisplayLookupValues() {
    var contactAddress = Xrm.Page.getAttribute('address1_composite').getValue();
    console.log("Contact Address is: " + contactAddress);

    var accountLookup = Xrm.Page.data.entity.attributes.get("parentcustomerid").getValue()[0];
    if (accountLookup !== true) {
        var accountName = accountLookup.name;
        var accountId = accountLookup.id;
        var accountType = accountLookup.entityType;
        console.log("Name of account is: " + accountName);
        console.log("GUID of Account is: " + accountId);
        console.log("Type of entity is: " + accountType);
    }
}