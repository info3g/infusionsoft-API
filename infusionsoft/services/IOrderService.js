module.exports = IOrderService = require('typedef')

// THIS CODE WAS GENERATED BY AN AUTOMATED TOOL. Editing it is not recommended.
// For more information, see http://github.com/bvalosek/grunt-infusionsoft
// Generated on Wed Jan 08 2014 12:43:55 GMT-0600 (CST)

// OrderService is used to build, create and charge for an order.
.interface('IOrderService') .define({

    // Returns the result of order placement. The ids of the order and invoice
    // that were created are returned along with the status of a credit card
    // charge if one was made.
    __xmlrpc__placeOrder: function(apiKey, contactId, creditCardId,
        payPlanId, productIds, subscriptionPlanIds, processSpecials,
        promoCodes, _leadAffiliatedId, _affiliatedId) {}

});