Feature: Prueba de apis

    Scenario: create a project
      Given A project <request>
      When I send POST request to http://localhost:8080/api/projects
      Then I get response code 200

    Examples:
      | request                                                                                               |
      | {"name": "PR-NAME","description": "prueba","idealInitDate": "10-10-2002","idealEndDate": "11-10-2003","invertedHours": 0,"initDate": "01-10-2003","endDate": "10-10-2003"}|

    Scenario: not create project
      Given A badly loaded project <doc> 
      When I send a project to POST http://localhost:8080/api/projects
      Then It was rejected with code 400

    # Nombre mal cargado
    Examples:
      | doc                                                |
      | {"name": "PR","description": "prueba","idealInitDate": "10-10-2002","idealEndDate": "11-10-2003","invertedHours": 0,"initDate": "01-10-2003","endDate": "10-10-2003"}|


    Scenario Outline: edit a Project 
      Given A edit project <request> by id
      When I Edit a Project, send PUT request to http://localhost:8080/api/projects/
      Then the project was edited, i get response code 200 

    Examples:
      | request                                                                                               |
      | {"name": "PR-ERP","description": "ERP","idealInitDate": "08-10-2002","idealEndDate": "12-10-2003","invertedHours": 10,"initDate": "02-10-2003","endDate": "11-10-2003"}|
   
    Scenario Outline: get a Project 
      Given A get project by id
      When I get a Project, send GET request to http://localhost:8080/api/projects/
      Then I get response data <response>, code 200

    Examples:
      | response                                                                                               |
      | {"name": "PR-ERP","description": "ERP","idealInitDate": "08-10-2002","idealEndDate": "12-10-2003","invertedHours": 10,"initDate": "02-10-2003","endDate": "11-10-2003"}|
   
    Scenario: Delete a Project
      Given A Project id
      When I delete that id, send DELETE request to http://localhost:8080/api/projects/
      Then that Project was deleted, code 200
