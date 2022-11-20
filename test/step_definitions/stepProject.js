const {Given, Then, When} = require('@cucumber/cucumber');
const assert = require('assert').strict;
const restHelper = require('../util/restHelper');
const projectSchema = require('../../src/models/project');
const parse = require('../util/parser');

var project;
var badProject;
var edit;
var result;
var badResult;
var id;
var idError;
var pathGet;

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

// 2º escenario
Given('A edit project {} by id', function (request) {
    project = JSON.parse(request);
});

When('I Edit a Project, send PUT request to {}', async function (path) {
    result = await restHelper.putData(`${path}${id}/update`, project);
});

Then('the project was edited, i get response code {int}', async function (code) {
    assert.equal(result.status, code);
});

// 3º escenario
Given('A get project by id', function () {});

When('I get a Project, send GET request to {}', async function(path) {
    result = await restHelper.getData(`${path}${id}`);
});

Then('I get response data {}, code {int}', async function (response, code) {
    const data = parse(response, id);
    assert(result.data, data);
    assert.equal(result.status, code);
});

// 4º escenario
Given('A Project id', function() {
});

When('I charge {} hours sending PUT {} hours', async function(value, path) {
    pathGet = path;
    result = await restHelper.putData(`${path}${id}/hours`, JSON.parse(value));
});

Then('The hours invested in the project will be updated a {int}', async function(newValue) {
    const update = await restHelper.getData(`${pathGet}${id}`);
    assert.equal(update.data.invertedHours, newValue);
});

// 5º escenario
When('I delete that id, send DELETE request to {}', async function(path) {
    result = await restHelper.deleteData(`${path}${id}`);
});

Then('that Project was deleted, code {int}', async function(code) {
    assert.equal(result.status, code);
});

// 6º escenario
Given('A badly loaded project {}', function(request) {
    badProject = JSON.parse(request);
});

When('I send a project to POST {}', async function(path) {
    try {
        badResult = await restHelper.postData(`${path}`, badProject);
    } catch (error) {
        if (error.response){
            badResult = error.response;
        }
    }
});

Then('It was rejected with code {int}', async function(code) {
    assert.equal(badResult.status, code);
});

// 7º escenario
Given('Project {} error', function(id) {
    idError = id;
});

When('I send GET {} and not get project', async function(path) { 
    try {
        badResult = await restHelper.postData(`${path}/${idError}`, badProject);
    } catch (error) {
        if (error.response){
            badResult = error.response;
        }
    }
});

// 8º escenario
When('I send DELETE {} and not deleted project', async function(path) {
    try {
        badResult = await restHelper.deleteData(`${path}/${idError}`);
    } catch (error) {
        if (error.response){
            badResult = error.response;
        }
    }
});