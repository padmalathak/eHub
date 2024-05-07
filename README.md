# eHub - The Universal User Management and Access Control dashboard

## Overview

This dashboard provides administrators with powerful tools to manage users and their permissions within our system. With integrated login functionality, administrators can securely access the dashboard and perform their tasks efficiently. 


### Problem

 In today's increasingly interconnected digital landscape, organizations are grappling with the complex task of efficiently managing user access and permissions across various systems and platforms. As the number of users grow and the diversity of roles within an organization expands, the need for a centralized solution to streamline user management becomes imperative. This dashboard emphasizes the growing complexity of user management in modern organizations and the need for a centralized solution to address these challenges effectively

### User Profile

The user profile management dashboard provides administrators with a centralized platform to oversee and manage user profiles within the system. Here's how administrators can use it:

1. User Profile Access: Admins can access the user profile management dashboard through their administrative accounts, typically with elevated permissions.
2. View User Profiles: Admins can view detailed profiles of individual users, including personal information, contact details, and account settings.
3. Edit User Profiles: Admins have the authority to edit user profiles, allowing them to update information such as names, email addresses, phone numbers, and other relevant details.
4. Manage Permissions: Admins can adjust user permissions and roles from the dashboard, granting or revoking access to specific features, functionalities, or sections of the system.
5. Activate/Deactivate Users: Admins can activate or deactivate user accounts as needed, temporarily suspending access or reactivating accounts as circumstances require.
6. User Search and Filtering: The dashboard may include search and filtering capabilities, allowing admins to quickly locate specific users based on criteria such as username, email address, or role.

### Features

**1. Admin User Profile Management**

    - User profile creation
    - User profile editing
    - User search and filtering capabilities
    - User Status Management
    - User Roles Management
    - Import users from external source

**2. User Dashboard** (Nice to Have)

    - User dashboard to view applications
    - Profile page for managing personal information

## Implementation

### Tech Stack

React , Express, MySQL

### APIs

**1. Okta**
    - **Read Users** GET on /api/v1/users
    HTTP GET requests to interact with Okta's user management endpoints, such as /api/v1/users to list all users. Example:

    ```
    curl -v -X GET \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -H "Authorization: SSWS ${api_token}" \
    "https://${yourOktaDomain}/api/v1/users"

    ```  

### Sitemap

1. Users Page
The users page will list all users in the database and provide management capabilities to an admin

2. User Profile Page
The user profile page is a page that lists additional profile information about a specic user. This page is editable by a `super_admin` only

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

1. Users Table


    | id       | firstName | lastName | email                                                     | jobTitle         | department             | city     | state    | country       | phone          | status | password                         | salt     | role |
    | -------- | --------- | -------- | --------------------------------------------------------- | ---------------- | ---------------------- | -------- | -------- | ------------- | -------------- | ------ | -------------------------------- | -------- | ---- |
    | u0000001 | Claire    | Cook     | [claire.cook@example.com](mailto:claire.cook@example.com) | Systems Engineer | Information Technology | Billings | Michigan | United States | (301) 967-2738 | Active | ab54ac4c0be9480ae8fa5e9e2a5196a3 | sld1yGtd | user |

2. Roles Table

    | roleId   | roleName        |
    | -------- | --------------- |
    | r0000001 | user            |
    | r0000002 | super_admin     |
    | r0000003 | read_only_admin |

3. 

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

User routes:
<strong>1. ENDPOINT for users<br></strong>
  a. /users/random - HTTP method GET , URL PATH : http://localhost:8081/users/random
    - Request Example:
    -  GET http://localhost:8081/users/random
  
    -  Response Example:<br>
      <code>[ {
    "firstName": "Essa",
    "lastName": "Wellard",
    "email": "ewellard0@timesonline.co.uk",
    "jobTitle": "Clinical Specialist",
    "department": "Engineering",
    "city": "Pittsburgh",
    "state": "Pennsylvania",
    "country": "United States",
    "phone": "724-880-6921",
    "role": "user",
    "password": "$2a$04$abc123xyz456",
    "salt": "\\$2/pW1M//G.6s91/.ciw/F0.6w2.X/U4U/vqT55.3yD3QUw95/n.P5M.38",
    "status": "Deactivated",
    "source": "random"
  },......
]</code>
 - Response:
    Success Response Code:
    200 OK

   b. /users/random - HTTP method POST , URL PATH : http://localhost:8081/users/random
    - Request Example:
    -  POST http://localhost:8081/users/random
  
    -  Request Body Example
    -   {oktaURL , APIToken}
  
    -  Response Example:
      <code>[
  {
    "firstName": "Essa",
    "lastName": "Wellard",
    "email": "ewellard0@timesonline.co.uk",
    "jobTitle": "Clinical Specialist",
    "department": "Engineering",
    "city": "Pittsburgh",
    "state": "Pennsylvania",
    "country": "United States",
    "phone": "724-880-6921",
    "role": "user",
    "password": "$2a$04$abc123xyz456",
    "salt": "\\$2/pW1M//G.6s91/.ciw/F0.6w2.X/U4U/vqT55.3yD3QUw95/n.P5M.38",
    "status": "Deactivated",
    "source": "random"
  },......
]</code>
 - Response:
    Success Response Code:
    200 OK

     c. /users - HTTP method GET , URL PATH : http://localhost:8081/users
    - Request Example:
    -  GET http://localhost:8081/users
    -  Headers:
Authorization: Bearer <Your Access Token>. Required.
Content-Type: Recommended to be set as application/json. Optional.
  
    -  Response Example:
      <code>[
  {
    "firstName": "Essa",
    "lastName": "Wellard",
    "email": "ewellard0@timesonline.co.uk",
    "jobTitle": "Clinical Specialist",
    "department": "Engineering",
    "city": "Pittsburgh",
    "state": "Pennsylvania",
    "country": "United States",
    "phone": "724-880-6921",
    "role": "user",
    "password": "$2a$04$abc123xyz456",
    "salt": "\\$2/pW1M//G.6s91/.ciw/F0.6w2.X/U4U/vqT55.3yD3QUw95/n.P5M.38",
    "status": "Deactivated",
    "source": "random"
  },......
]</code>
 - Response:
    Success Response Code:
    200 OK

   -- ----------------------------------------------
   --Endpoint: Get user Roles and their count

-HTTP Method:
GET

-URL Path:
/users/roles

-Headers:
-Authorization: Bearer <Your Access Token>. Required.<br>
-Content-Type: Recommended to be set as application/json. Optional.

Request Example:
GET 
Host: http://localhost:8081/users

Response:
Success Response Code:
200 OK
Success Response Body (JSON):
<code>[
  {
    "role": "super_admin",
    "count_of_role": 37
  },
  {
    "role": "user",
    "count_of_role": 36
  },
  {
    "role": "read_only_admin",
    "count_of_role": 40
  }
]
</code>

---------------------------------------------------
 --Endpoint: Get user Roles details

  -HTTP Method:
    GET

  -URL Path:
   /users/roledetails?role=super_admin

-Headers:
-Authorization: Bearer <Your Access Token>. Required.<br>
-Content-Type: Recommended to be set as application/json. Optional.

Request Example:
GET 
Host: http://localhost:8081/users?role=super_admin

Response:
Success Response Code:
200 OK
Success Response Body (JSON):
<code>[
  {
    "id": 1,
    "firstName": "Keenan",
    "lastName": "Tallent",
    "email": "ktallent0@dyndns.org",
    "jobTitle": "Recruiter",
    "department": "Product Management",
    "city": "Montgomery",
    "state": "Alabama",
    "country": "United States",
    "phone": "334-955-0935",
    "status": "Active",
    "password": "$2a$04$2CHYMVKZB1gEb0CO0fCe5uFKGuhcRnNoqGGLXsbEtpp7Z57ywDGvC",
    "salt": "fqryOMXB",
    "role": "super_admin",
    "source": "random"
  },....]</code>

  ---------------------------------------------------
 --Endpoint: Get user by ID

  -HTTP Method:
    GET

  -URL Path:
   /users/:id


 -Request Example:
  GET 
  Host: http://localhost:8081/users/1

Response:
Success Response Code:
200 OK
Success Response Body (JSON):
<code>{
  "id": 1,
  "firstName": "Keenan",
  "lastName": "Tallent",
  "email": "ktallent0@dyndns.org",
  "jobTitle": "Recruiter",
  "department": "Product Management",
  "city": "Montgomery",
  "state": "Alabama",
  "country": "United States",
  "phone": "334-955-0935",
  "status": "Active",
  "password": "$2a$04$2CHYMVKZB1gEb0CO0fCe5uFKGuhcRnNoqGGLXsbEtpp7Z57ywDGvC",
  "salt": "fqryOMXB",
  "role": "super_admin",
  "source": "random"
}</code>


  ---------------------------------------------------
 --Endpoint: put user by ID

  -HTTP Method:
    put

  -URL Path:
   /users/:id


 -Request Example:
  put 
  Host: http://localhost:8081/users/1

Response:
Success Response Code:
200 OK
Success Response Body (JSON):
<code>{
  "id": 1,
  "firstName": "Maneen",
  "lastName": "Tallent",
  "email": "ktallent0@dyndns.org",
  "jobTitle": "Recruiter",
  "department": "Product Management",
  "city": "Montgomery",
  "state": "Alabama",
  "country": "United States",
  "phone": "334-955-0935",
  "status": "Active",
  "password": "$2a$04$2CHYMVKZB1gEb0CO0fCe5uFKGuhcRnNoqGGLXsbEtpp7Z57ywDGvC",
  "salt": "fqryOMXB",
  "role": "super_admin",
  "source": "random"
}</code>

  ---------------------------------------------------
 --Endpoint: Delete user by ID

  -HTTP Method:
    Delete

  -URL Path:
   /users/:id


 -Request Example:
  Delete 
  Host: http://localhost:8081/users/1

  -Response:
   Success Response Code:
   204 No Content

   ====================================================================================

<bold>Login Routes </bold>
<strong>1. ENDPOINT for Login<br></strong>
 
 --Endpoint: User Authentication
  -HTTP Method:
    POST

  -URL Path:
   /login


 -Request Example:
  put 
  Host: http://localhost:8081/login

Response:
Success Response Code:
200 OK
Success Response Body (JSON):
<code>{
token: token
}</code>

   ====================================================================================

<bold>App Routes </bold><br>
<strong>1. ENDPOINT for apps<br></strong>
 
 --Endpoint: /apps
  -HTTP Method:
    GET

  -URL Path:
   /apps


 -Request Example:
  GET 
  Host: http://localhost:8081/apps

  Headers:
Authorization: Bearer <Your Access Token>. Required.
Content-Type: Recommended to be set as application/json. Optional.

Response:
Success Response Code:
200 OK
Success Response Body (JSON):
<code>
[
  {
    "id": 1,
    "user_id": 103,
    "app_name": "slack",
    "app_link": "https://slack.com/",
    "app_img": "https://cdn.bfldr.com/5H442O3W/at/pl546j-7le8zk-btwjnu/Slack_RGB.png?auto=webp&format=png"
  },
  {
    "id": 2,
    "user_id": 103,
    "app_name": "salesforce",
    "app_link": "https://www.salesforce.com/",
    "app_img": "https://www.salesforce.com/news/wp-content/uploads/sites/3/2020/08/SFDO-Logo-2020-RGB-Vert-FullColor.png?w=1024&h=552"
  },.....]
</code>

-----------------------------------------
 --Endpoint: /apps/list  Get the list of all unique apps and their count - ADMIN ONLY ACCESS
  -HTTP Method:
    GET

  -URL Path:
   /apps/list


 -Request Example:
  GET 
  Host: http://localhost:8081/apps/list

  Headers:
Authorization: Bearer <Your Access Token>. Required.
Content-Type: Recommended to be set as application/json. Optional.

Response:
Success Response Code:
200 OK
Success Response Body (JSON):
<code>
[
  {
    "app_name": "slack",
    "count": 2
  },
  {
    "app_name": "salesforce",
    "count": 2
  },
  {
    "app_name": "Office365",
    "count": 2
  },
  {
    "app_name": "Zoom",
    "count": 1
  }
]
</code>

-----------------------------------------
 --Endpoint: /apps/users  returns the object which has list of users for that app - ADMIN ONLY ACCESS
  -HTTP Method:
    GET

  -URL Path:
   /apps/users


 -Request Example:
  GET 
  Host: http://localhost:8081/apps/users?app_name=slack

  Headers:
Authorization: Bearer <Your Access Token>. Required.
Content-Type: Recommended to be set as application/json. Optional.

-Response:
Success Response Code:
200 OK
Success Response Body (JSON):
<code>
[
  {
    "id": 103,
    "firstName": "Padmalatha",
    "lastName": "Krishnaswamy",
    "email": "padmalathatce@gmail.com",
    "jobTitle": "jobTitledfdf",
    "department": "departmentdfd",
    "city": "SF",
    "state": "statedfd",
    "country": "USA",
    "phone": "6047247962",
    "role": "user",
    "status": "Active"
  },.......
]
</code>
-----------------------------------------
 --Endpoint: /apps/users Assigns Apps to Users - ADMIN ONLY ACCESS
  -HTTP Method:
    POST

  -URL Path:
   /apps/users


 -Request Example:
  POST 
  Host: http://localhost:8081/apps/users
  reqBody:{
  selectedRows:1,
  appName:slack
  }

  Headers:
Authorization: Bearer <Your Access Token>. Required.
Content-Type: Recommended to be set as application/json. Optional.

Response:
Success Response Code:
200 OK
Success Response Body (JSON):
<code>
[
  {
    "id": 103,
    "firstName": "Padmalatha",
    "lastName": "Krishnaswamy",
    "email": "padmalathatce@gmail.com",
    "jobTitle": "jobTitledfdf",
    "department": "departmentdfd",
    "city": "SF",
    "state": "statedfd",
    "country": "USA",
    "phone": "6047247962",
    "role": "user",
    "status": "Active"
  },.......
]
</code>



1. Dashboard (/dashboard) - GET
    Users can navigate through a user-friendly interface to discover available applications assigned by the administrator

2. Profile (/profile) - GET and POST
    Users can view and modify their profile information, including display name, contact details, preferences, and password

3. User Management (/admin/users) - GET
    Admin endpoint to view list of all users by source

4. User Profile Management (/admin/users/{userID}) - GET and POST
    Admin endpoint to view additional user profile attributes and edit them

5. User Role Management (/admin/users/{userID}/roles) - GET and POST
    Admin endpoint to view and update the role assigned to a user


### Auth

Plan for Auth as a nice to have is to include two mechanisms for authentication:
1. Local Authentication
    Implement authentication using username and password which is stored locally in the database.
2. Social Authentication
    Enable users to use social providers like Google, Facebook, LinkedIn etc. to login to the application.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

## Nice-to-haves

- Authentication
- OAuth Authorization
- Using Anything as a source to fetch Users
- 

