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

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

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

