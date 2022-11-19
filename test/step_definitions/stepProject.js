const {Given, Then, When} = require('@cucumber/cucumber');
const assert = require('assert').strict;
const restHelper = require('../util/restHelper');
const projectSchema = require('../../src/models/project');
const parse = require('../util/parser');

var project;
var edit;
var result;
var id

// 1º escenario
Given('A project {}', function (request) {
    project = JSON.parse(request);
});

When('I send POST request to {}', async function (path) {
    result = await restHelper.postData(`${path}`, project);
    id = result.data._id;
});

Then('I get response code {int}', async function (code) {
    assert.equal(result.status, code);
});

// 2ª escenario
Given('A edit project {} by id', function (request) {
    project = JSON.parse(request);
});

When('I Edit a Project, send PUT request to {}', async function (path) {
    result = await restHelper.putData(`${path}${id}/update`, project);
});

Then('the project was edited, i get response code {int}', async function (code) {
    assert.equal(result.status, code);
});

// 3ª escenario
Given('A get project by id', function () {});

When('I get a Project, send GET request to {}', async function(path) {
    result = await restHelper.getData(`${path}${id}`);
});

Then('I get response data {}, code {int}', async function (response, code) {
    const data = parse(response, id);
    assert(result.data, data);
    assert.equal(result.status, code);
});

// 4ª escenario
Given('A Project id', function() {});

When('I delete that id, send DELETE request to {}', async function(path) {
    result = await restHelper.deleteData(`${path}${id}`);
});

Then('that Project was deleted, code {int}', async function(code) {
    assert.equal(result.status, code);
})