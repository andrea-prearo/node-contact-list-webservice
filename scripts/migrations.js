'use strict';

var fs = require('fs');
var _ = require('lodash');

var migrations = {

  _readContacts: function () {
    var content = fs.readFileSync('contacts.json');
    var jsonContent = JSON.parse(content);
    return jsonContent;
  },

  _writeContacts: function (jsonContent) {
    fs.writeFileSync('migrated-contacts.json', jsonContent);
  },

  phone: function () {
    var jsonArray = migrations._readContacts();
    _.forEach(jsonArray, function(item) {
      var phoneNumbers = item.phone;
      var homeNumber = phoneNumbers[0];
      var workNumber = phoneNumbers[1];
      var newNumbers = [];
      newNumbers.push({
        label: 'Personal',
        data: homeNumber
      });
      newNumbers.push({
        label: 'Work',
        data: workNumber
      });
      var count = 1;
      phoneNumbers.splice(0, 2);
      _.forEach(phoneNumbers, function(item) {
        newNumbers.push({
          label: 'phone' + count,
          data: item
        })
        count++
      });
      item.phone = newNumbers
    });
    migrations._writeContacts(JSON.stringify(jsonArray));
  },

  email: function () {
    var jsonArray = migrations._readContacts();
    _.forEach(jsonArray, function(item) {
      var emailAddresses = item.email;
      var homeEmail = emailAddresses[0];
      var workEmail = emailAddresses[1];
      var newAddresses = [];
      newAddresses.push({
        label: 'Personal',
        data: homeEmail
      });
      newAddresses.push({
        label: 'Work',
        data: workEmail
      });
      var count = 1;
      emailAddresses.splice(0, 2);
      _.forEach(emailAddresses, function(item) {
        newAddresses.push({
          label: 'email' + count,
          data: item
        })
        count++
      });
      item.email = newAddresses
    });
    migrations._writeContacts(JSON.stringify(jsonArray));
  },

  location: function () {
    var jsonArray = migrations._readContacts();
    _.forEach(jsonArray, function(item) {
      var locations = item.location;
      var homeLocation = locations[0];
      var workLocation = locations[1];
      var newLocation = [];
      newLocation.push({
        label: 'Home',
        data: homeLocation
      });
      newLocation.push({
        label: 'Work',
        data: workLocation
      });
      var count = 1;
      locations.splice(0, 2);
      _.forEach(locations, function(item) {
        newLocation.push({
          label: 'location' + count,
          data: item
        })
        count++
      });
      item.location = newLocation
    });
    migrations._writeContacts(JSON.stringify(jsonArray));
  }

}

module.exports = migrations;
