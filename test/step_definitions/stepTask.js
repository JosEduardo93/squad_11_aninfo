const {Given, Then, When} = require('@cucumber/cucumber');
const assert = require('assert').strict;
const restHelper = require('../util/restHelper');
const parse = require('../util/parser');
const projectSchema = require('../../src/models/project');

var task;
var id;
var result;
var hours;

//Creo un proyecto para asociar la tarea
const project = {
    "name": "PR-NAME",
    "description": "prueba",
    "idealInitDate": "10-10-2002",
    "idealEndDate": "11-10-2003",
    "invertedHours": 0,
    "initDate": "01-10-2003",
    "endDate": "10-10-2003"
}

const projectResult = async function(p) {
   const result = await restHelper.postData("http://localhost:8080/api/projects",p);
   return result.data._id;
};
var idProject
projectResult(project).then((a)=>idProject = a);
const idP = idProject;
console.log("id",idP)

// 1º escenario
Given('A task {}', function (request) {
    task = JSON.parse(request);
    task.projectID = idProject;
});

When('I want to create it using the post request {}', async function (path) {
    try {
        result = await restHelper.postData(`${path}`, task);
        id = result.data._id;
    } catch (error) {
        if (error.response){
            result = error.response;
        }
    }
});

Then('it is created successfully with code {int}', async function (value) {
    assert.equal(result.status, value);
});

//2
Then('the task is not created with code {int}', async function (value) {
    assert.equal(result.status, value);
});


//3
Given ('A Edit task {} by id',function (request){
    hours = JSON.parse(request);
});
When ('I Edit a task, send PUT request to {}', async function(path){
    result = await restHelper.putData(`${path}${id}/hours`, hours);
});
Then ('the task was edited, i get response code {int}',function(code){
    assert.equal(result.status, code);
});

//4
Given('A get task by id', function () {});

When('I get a task, send GET request to {}', async function(path) {
    result = await restHelper.getData(`${path}${id}`);
});

Then('I get the requested task {}, code {int}', async function (response, code) {
    const data = parse(response, id);
    assert(result.data, data);
    assert.equal(result.status, code);
});

//5
Given('A idProject', function() {});

When('I receive all the task associated with a project, I request {}', async function(path) {
    result = await restHelper.getData(`${path}${idProject}`)
});

Then('I get all requested task with code {int}', async function(value) {
    assert.equal(result.status, value);
});

//6
Given('A Task id', function() {});

When('I delete a task by its id, send DELETE request to {}', async function(path) {
    result = await restHelper.deleteData(`${path}${id}`);
});

Then('that task was deleted, code {int}', async function(code) {
    assert.equal(result.status, code);
    // elimino el proyecto creado
    restHelper.deleteData(`http://localhost:8080/api/projects/${idProject}`);
});

