'use strict';

var faker = require('faker');

var location = {

    generate: function () {
      return {
          address: faker.Address.streetAddress(),
          city: faker.Address.city(),
          state: faker.Address.usState(),
          country: "USA",
          zipCode: faker.Address.zipCode()
      }
    }

}

module.exports = location;
