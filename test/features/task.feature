Feature: Prueba de apis

    Scenario: create a task
      Given A task <request>
      When I want to create it using the post request http://localhost:8080/api/tasks
      Then it is created successfully with code 200

    Examples:
      | request                                                                                               |
      | {"name": "Terminar este tp", "description": "hay que terminarlo de una forma u otra","idealInitDate": "11-13-2022","idealEndDate": "12-5-2022","responsible": "yo","invertedHours": 0,"initDate": "11-10-2022","endDate": "12-5-2022","status": "pending"}|

    Scenario: create task without data required
      Given A task <request> 
      When I want to create it using the post request http://localhost:8080/api/tasks
      Then the task is not created with code 400

    Examples:
      | request                                                                                               |
      | {"idealInitDate": "10-11-2022","idealEndDate": "5-12-2022","responsible": "yo","invertedHours": 0,"initDate": "10-11-2022","endDate": "5-12-2022","status": "pending"}|

    Scenario: edit hours a task 
      Given A Edit task <request> by id
      When I Edit a task, send PUT request to http://localhost:8080/api/tasks/
      Then the task was edited, i get response code 200 

    Examples:
      | request         |
      | { "hours": 20 }|
   
    Scenario: get a Task 
      Given A get task by id
      When I get a task, send GET request to http://localhost:8080/api/tasks/
      Then I get the requested task <response>, code 200
    Examples:
      | response                                                                                               |
      | {"name": "Terminar este tp", "description": "hay que terminarlo de una forma u otra","idealInitDate": "11-13-2022","idealEndDate": "12-5-2022","responsible": "yo","invertedHours": 0,"initDate": "11-10-2022","endDate": "12-5-2022","status": "pending"}|

    Scenario: Delete a Project
      Given A Task id
      When I delete a task by its id, send DELETE request to http://localhost:8080/api/tasks/
      Then that task was deleted, code 200
