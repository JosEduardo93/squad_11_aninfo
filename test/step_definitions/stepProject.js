const {Given, Then, When} = require('@cucumber/cucumber');
const assert = require('assert').strict;
const restHelper = require('../util/restHelper');
const projectSchema = require('../../src/models/project');

var project;
var result

Given('A project {}', function (request) {
    project = JSON.parse(request);
});

When('I send POST request to {}', async function (path) {
    result = await restHelper.postData(`${path}`, project);
})

Then('I get response code {int}', async function (code) {
    assert.equal(result.status, code);
});