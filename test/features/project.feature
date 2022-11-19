Feature: Prueba de apis

    # Scenario: Create Project
    # Given I enter the data to the form correctly
    # When I submit the form
    # Then The project is created
  
    Scenario: create a project
        Given A project <request>
        When I send POST request to http://localhost:8080/api/projects
        Then I get response code 200

    Examples:
      | request                                                                                               |
      | {"name": "PR-NAME","description": "prueba","idealInitDate": "10-10-2002","idealEndDate": "11-10-2003","invertedHours": 0,"initDate": "01-10-2003","endDate": "10-10-2003"}|

    # Scenario: Edit Project 
    # Given A Project id
    # When Edit a Project
    # Then the project was edited

    # Scenario: Delete a Project
    # Given a Project id
    # When I delete that id
    # Then that Project was deleted