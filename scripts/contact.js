'use strict';

var faker = require('faker');
var location = require('./location');

var contact = {

    generate: function () {
      var count = 10
      var output = '[';
      for (var i = 0; i < count; i++) {
        var json = JSON.stringify({
          avatar: faker.Image.avatar(),
          firstName: faker.Name.firstName(),
          lastName: faker.Name.lastName(),
          email: [
            faker.Internet.email(),
            faker.Internet.email()
          ],
          phone: [
            faker.PhoneNumber.phoneNumber(),
            faker.PhoneNumber.phoneNumber()
          ],
          company: faker.Company.companyName(),
          location: [
            location.generate(),
            location.generate()
          ]
        });
        output = output.concat(json)
        if (i < count - 1) {
          output = output.concat(',');
        }
      }
      output = output.concat(']');
      console.log(output);
    }

}

module.exports = contact;
