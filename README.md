<h1>Authentication API Documentation</h1>
<hr/>
This RESTful API is built for user authentication. It has six routes that can be accessed using different HTTP methods. The following are the details of each route.

<h3>Route 1: /auth/signup</h3>
This route is used to create a new user account. It can be accessed using the POST method and requires the following parameters:
<br>
<ul>
  <li>name (string) - the user's name. It cannot be empty.</li>
  <li>email (string) - the user's email address. It must be a valid email address and not registered earlier.</li>
  <li>password (string) - the user's password. It must be at least 8 characters long, contain at least one uppercase letter, one lowercase    letter, one number, and one special character.</li>
</ul>
On successful registration, a JSON response with a status code of 201 will be returned. The response will also contain a newly generated JWT token with a validity of 1 hour and the user ID.
<br>
In case of any validation errors, a JSON response with a status code of 401 will be returned with an appropriate error message.

<h3>Route 2: /auth/login</h3>
This route is used to log in to a previously created account. It can be accessed using the POST method and requires the following parameters:
<br>
<ul>
  <li>email (string) - the user's email address. It must be a valid email address and previously registered.</li>
  <li>password (string) - the user's password. It must match the previously used password.</li>
</ul>
On successful login, a JSON response with a status code of 201 will be returned. The response will also contain a newly generated JWT token with a validity of 1 hour and the user ID.
<br>
In case of any validation errors, a JSON response with a status code of 401 will be returned with an appropriate error message.

<h3>Route 3: /auth/deleteuser</h3>
This route is used to delete the currently logged in user. It can be accessed using the DELETE method and requires an 'Authorization' header containing the previously passed JWT token in the format "Bearer JWTTOKEN", where JWTTOKEN is the value of the previously passed JWT token.
<br>
On successful deletion, a status code of 200 will be returned. Otherwise, a status code of 404 will be returned.

<h3>Route 4: /auth/newtoken</h3>
This route is used to generate a new JWT token for the currently logged in user. It can be accessed using the GET method and requires an 'Authorization' header containing the previously passed JWT token in the format "Bearer JWTTOKEN", where JWTTOKEN is the value of the previously passed JWT token.
<br>
On successful generation of a new token, a JSON response with a status code of 200 will be returned. The response will also contain the newly generated JWT token. Otherwise, a status code of 404 will be returned.

<h3>Route 5: /auth/user</h3>
This route is used to get the profile of the currently logged in user. It can be accessed using the GET method and requires an 'Authorization' header containing the previously passed JWT token in the format "Bearer JWTTOKEN", where JWTTOKEN is the value of the previously passed JWT token.
<br>
On successful retrieval of the user profile, a JSON response with a status code of 200 will be returned. The response will contain the user details. Otherwise, a status code of 404 will be returned.

<h3>Route 6: /auth/users</h3>
This route is used to get the list of all the users. It can be accessed using the GET method and requires an 'Authorization' header containing the previously passed JWT token in the format "Bearer JWTTOKEN", where JWTTOKEN is the value of the previously passed JWT token.
<br>
On successful retrieval of the list of all users, a JSON response with a status code of 200 will be returned. The response will contain all the users details. Otherwise, a status code of 404 will be returned.
