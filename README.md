# Infusionsoft API Description

 The Infusionsoft REST API enables second and third party applications to manage contacts, tasks, appointments, and more. And, with REST Hooks, your applications can receive notification of changes.

## Usage

Install via `npm`:

```
$ npm install infusionsoft-api
```

Do cool stuff:

```javascript
var api = require('infusionsoft-api');

var infusionsoft = new api.DataContext('myapp', 'MY_API_KEY');

infusionsoft.Contacts
    .where(Contact.FirstName, 'Brandon')
    .like(Contact.LastName, 'V%')
    .select(Contact.Id, Contact.Email)
    .orderByDescending('LastName')
    .take(100)
    .toArray()
    .done(function(result) {
        console.log(result);
    });
```

You can also use the API Services directly:

```javascript
infusionsoft.ContactService
    .findByEmail('brandon@aol.com', ['Id', 'FirstName', 'LastName']);
```

Awesome.

### Login a user and get their info

And an example of using the `fail` method to catch any problems.

```javascript
infusionsoft.DataService
    .authenticateUser('user@email.com', 'md5-hash-of-password')
    .then(function(userId) {
        return infusionsoft.Users.where(User.Id, userId).first();
    })
    .then(function(user) {
        console.log('Hello ' + user.FirstName + ' ' + user.LastName);
    })
    .fail(function(err) {
        console.log('uh oh: ' + err);
    });
```

### Get all invoices for a specific month, grouped by product

Uses [underscore](http://underscorejs.org/).

```javascript
infusionsoft.Invoices
    .like(Invoice.DateCreated, '2013-08%')
    .groupBy(function(x) { return x.ProductSold; })
    .done(function(result) {
        _(result).each(function(invoices, productId) {
            console.log(productId, invoices.length);
        });
    });
```

Same as above, but use the `spread` function to wait on 2 promises to get the
corresponding product names. The API hits for querying both the `Product` table
and the `Invoice` table will actually fire off at the same time.

Hashtag asynchronous.

```javascript
var products = infusionsoft.Products.toArray();
var invoices = infusionsoft.Invoices
    .like(Invoice.DateCreated, '2013-08%')
    .groupBy(function(x) { return x.ProductSold; });

Q.spread([products, invoices], function(products, invoices) {
   _(invoices).each(function(invoices, productId)  {
        var productName = _(products)
            .find(function(x) { return x.Id == productId; })
            .ProductName;

        console.log(productName, invoices.length);
   });
});
```

### From an email address, get a contact's tags

```javascript
sdk.Contacts
    .where(Contact.Email, 'some@email.com')
    .first()
    .then(function(contact) {
        return sdk.ContactGroupAssigns
            .where(ContactGroupAssign.ContactId, contact.Id)
            .toArray();
    })
    .then(function(cgas) {
        cgas.forEach(function(group) {
            console.log(group.ContactGroup, group.DateCreated);
        });
    });
```



### `join` (`innerQueryable`, `outerKey`, `innerKey`, `selectorFn`)

Let's do this:


```javascript
var pc    = infusionsoft.ProductCategories;
var pca   = infusionsoft.ProductCategoryAssigns;
var plans = infusionsoft.SubscriptionPlans;

// Join the categories onto itself for creating the full category name
// (category parent name + category name)
var categories = pc
    .join(pc, 'ParentId', 'Id', function(pc, parent) {
        return {
            Id: pc.Id,
            Name: parent.CategoryDisplayName + ' ' + pc.CategoryDisplayName
        }; });

var subPlans = plans

    // Join the sub plan (which only has product Id) onto the PCA table to get
    // the product category ID
    .join(pca, 'ProductId', 'ProductId', function(plan, pca) {
        plan.ProductCategoryId = pca.ProductCategoryId;
        return plan;
    })


    // Join our categories object we made above onto the projection from the
    // most recent join to get the full category name + subscription plan Id
    .join(categories, 'ProductCategoryId', 'Id', function(plan, category) {
        return { planId: plan.Id, category: category.Name }; });

subPlans.toArray().done(function(d) { console.log(d); });
```

What happens magically behind the scenes is pretty nice. When we call
`toArray()` at the end, we first query the SubscriptionPlan table (aliased as
`plans`). It then knows we need to join the `ProductCategoryAssign` table on
there, so it fetches that (which may be more than one page). It finally gets
the `ProductCategory` table (in its entirety), and joins them all up.

The syntax looks nasty, but that is somewhat unavoidable with a `join`
function.


