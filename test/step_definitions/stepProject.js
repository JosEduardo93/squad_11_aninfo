const {Given, Then, When} = require('@cucumber/cucumber');
const assert = require('assert').strict;
const restHelper = require('../util/restHelper');
const projectSchema = require('../../src/models/project');

var project;
var edit;
var result;
const fromDb = undefined;
const obj = fromDb || {};

Given('A project {}', function (request) {
    project = JSON.parse(request);
});

When('I send POST request to {}', async function (path) {
    result = await restHelper.postData(`${path}`, project);
    obj.id = result.data._id;
    console.log("\n este es id", obj.id);
});

Then('I get response code {int}', async function (code) {
    assert.equal(result.status, code);
});

// 2ª scenario
// Given('A edit project {} by id', function (request) {
//     console.log("\n id", project);
//     project = JSON.parse(request);
// });

// When('I Edit a Project, send PUT request to {}', async function (path) {
//     // result = await restHelper.putData(`${path}${id}`, project);
// });

// Then('the project was edited, i get response code {int}', async function (code) {
//     assert.equal(result.status, code);
// });
