'use strict';

var faker = require('faker');
var contact = require('./contact');

var count = 10
var output = '[';
for (var i = 0; i < count; i++) {
  var json = JSON.stringify(contact.generate());
  output = output.concat(json)
  if (i < count - 1) {
    output = output.concat(',');
  }
}
output = output.concat(']');
console.log(output);
