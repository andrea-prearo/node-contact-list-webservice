'use strict';

var faker = require('faker');

for (var i = 0; i < 16; i++) {
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
    address: faker.Address.streetAddress(),
    city: faker.Address.city(),
    state: faker.Address.usState(),
    country: "USA",
    zipCode: faker.Address.zipCode()
  });
  console.log(json);
}
