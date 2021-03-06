module.exports = IDataService = require('typedef')

// THIS CODE WAS GENERATED BY AN AUTOMATED TOOL. Editing it is not recommended.
// For more information, see http://github.com/bvalosek/grunt-infusionsoft
// Generated on Wed Jan 08 2014 12:43:55 GMT-0600 (CST)

// The DataService is used to manipulate most data in Infusionsoft. It permits you
// to work on any available tables and has a wide range of uses. Here's a list of
// all available tables, and the fields they contain: InfusionSoft Tables (Pro
// Tip: Open this in a new tab.)
.interface('IDataService') .define({

    // Adds a record to the specified table in Infusionsoft.
    __xmlrpc__add: function(apiKey, table, values) {},

    // Loads a struct with data from the given database record
    __xmlrpc__load: function(apiKey, table, recordId, wantedFields) {},

    // Updates the specified record (indicated by ID) with the data provided
    __xmlrpc__update: function(apiKey, table, Id, values) {},

    // Deletes the specified record in the given table from the database
    __xmlrpc__delete: function(apiKey, table, Id) {},

    // This will locate all records in a given table that match the criteria for a
    // given field
    __xmlrpc__findByField: function(apiKey, table, limit, page, fieldName,
        fieldValue, returnFields) {},

    // Performs a query across the given table based on the query data
    __xmlrpc__query: function(apiKey, table, limit, page, queryData,
        selectedFields) {},

    // Creates a new custom fields within Infusionsoft
    __xmlrpc__addCustomField: function(apiKey, customFieldType,
        displayName, dataType, headerId) {},

    // This method is used to authenticate an Infusionsoft username and
    // password(md5 hash). If the credentials match it will return back a User ID,
    // if the credentials do not match it will send back an error message
    __xmlrpc__authenticateUser: function(apiKey, username, passwordHash) {},

    // This method will return back the data currently configured in a user
    // configured application setting
    __xmlrpc__getAppSetting: function(apiKey, module, setting) {},

    // Returns an iCalendar entry for the given appointment
    __xmlrpc__getAppointmentCal: function(apiKey, appointmentId) {},

    // Returns a temporary API key which is valid for one hour if given a valid
    // Vendor key and user credentials. For security, never store a users password
    // in plaintext. You only need to pass the MD5 hash with this method, so only
    // the MD5 hash needs to be stored.
    __xmlrpc__insecure__getTemporaryKey: function(vendorKey, username,
        passwordHash) {},

    // Updates a custom field. Every field can have it's display name and group id
    // changed, but only certain data types will allow you to change
    // values(dropdown, listbox, radio, etc)
    __xmlrpc__updateCustomField: function(apiKey, customFieldId, values) {}

});