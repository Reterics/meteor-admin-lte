// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by admin-lte.js.
import { name as packageName } from "meteor/redaty:admin-lte";

// Write your tests here!
// Here is an example.
Tinytest.add('admin-lte - example', function (test) {
  test.equal(packageName, "admin-lte");
});
