# Bobs Garage API

Restful API for Bob's Garage built and designed with Node.js and Express Utilising ES Modules. Incorporating MySql through an ORM called Sequelize and this API uses JWT for logins.

- **Base URL**: `http://localhost:3000/api`
- **Format**: JSON in & out. Image uploads use `multipart/form-data`
- **Auth**: Protected routes require login token in the `x-auth-token` header and tokens last 7 days before expiry.

## Folder Structure

```
server/src/
├── server.js          Entry point: middleware, mounts routers, 404 + 500 error handlers, starts server
├── config/config.js   Reads .env (port, database, JWT secret & other sensitive information  required for the server)
├── models/models.js   Database connection, the 5 models and their relationships
├── routes/            One file per area: URL + method → middleware → controller
├── controllers/       Runs the database queries and sends the response
├── middleware/        auth, admin, upload, avatarUpload
├── utils/validate.js  Joi schemas and the validate() middleware
├── logger/logger.js   Winston + Morgan request logging

```

## Request Flow

Route → `auth` → Joi `validate` → controller → Sequelize → MySql → JSON response

- **auth**: Checks the token and sets `req.user`
- **admin**: Lets only admins through
- **validate**: Checks the body against a Joi schema and outputs every issue at once
- **controller**: Runs the query and sends result to the database

## Status Codes

| Code      | Meaning                                 |
| --------- | --------------------------------------- |
| 200 / 201 | Success or created                      |
| 204       | Deleted, no body                        |
| 400       | Validation failed: `{ msg, errors }`    |
| 401       | No token or invalid / expired token     |
| 403       | Logged in but not an admin              |
| 404       | Item or route not found                 |
| 500       | Server error: `{ msg: "Server Error" }` |

Errors always return `{ msg }` Passwords are never returned.

## Endpoints

Access: **Public** = Anyone **User** = Logged in (`Authenticated & Authorized`) User
**Admin** = Logged in Admin (`Authenticated & Authorized Admin`)

### Test Route `/api`

| Method | Endpoint | Access | Description            |
| ------ | -------- | ------ | ---------------------- |
| GET    | `/`      | Public | Confirms API is Active |

### Authentication & Authorization `/api/auth`

| Method | Endpoint    | Access | Description                                                                             |
| ------ | ----------- | ------ | --------------------------------------------------------------------------------------- |
| POST   | `/register` | Public | Create an account with firstName, lastName, email, password,image which returns a token |
| POST   | `/login`    | Public | Login with email & password credentials which returns a token                           |
| GET    | `/`         | User   | The logged in user's credentials without the password                                   |

### Users `/api/users`

| Method | Endpoint     | Access | Description                                             |
| ------ | ------------ | ------ | ------------------------------------------------------- |
| GET    | `/`          | Admin  | All Users without password                              |
| POST   | `/add`       | Admin  | Add a User and password is required                     |
| PUT    | `/edit/:id`  | Admin  | Update a user and password is optional                  |
| DELETE | `/edit/:id`  | Admin  | Delete a User                                           |
| POST   | `/me/avatar` | User   | Upload your own profile image → **`form field avatar`** |
| DELETE | `me/avatar`  | User   | Remove your profile image                               |

### Services `/api/services`

| Method | Endpoint               | Access | Description                                                                                       |
| ------ | ---------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| GET    | `/`                    | Public | All services                                                                                      |
| GET    | `/edit/:id`            | Public | One service by id                                                                                 |
| GET    | `/o/:field/:direction` | Public | Sorted services such as field:name,type,fee or created at direction ascending or descending order |
| GET    | `/s/:search`           | Public | Services whose name matches the search criteria of search text                                    |
| POST   | `/add`                 | Admin  | Add a service → **`name, type, description, fee, image`**                                         |
| PUT    | `/edit/:id`            | Admin  | Update a service which has same fields as add                                                     |
| DELETE | `/edit/:id`            | Admin  | Delete a service                                                                                  |

### Favourites `/api/favourites`

| Method | Endpoint               | Access | Description                                                               |
| ------ | ---------------------- | ------ | ------------------------------------------------------------------------- |
| GET    | `/`                    | User   | My saved or favourited services                                           |
| POST   | `/:serviceId`          | User   | Save or favourite a service and you cannot save twice                     |
| DELETE | `/:serviceId`          | User   | Remove a saved or favourite service                                       |
| GET    | `/all`                 | Admin  | Every favourite with customer's details for interested page for the admin |
| PUT    | `/:favouriteId/status` | Admin  | Set the status to new or contacted customers                              |

### Enquiries `/api/enquiries`

| Method | Endpoint            | Access | Description                                                                                         |
| ------ | ------------------- | ------ | --------------------------------------------------------------------------------------------------- |
| GET    | `/my-enquiries`     | User   | My enquiries and the replies which is in the inbox                                                  |
| POST   | `/:serviceId`       | User   | Send an enquiry about service with a message that is between 10 to 1000 characters                  |
| PUT    | `/:enquiryId/read`  | User   | Tick a reply as read                                                                                |
| GET    | `/`                 | Admin  | All enquiries with the optional `?status=pending` or `?status=responded` to filter based on statues |
| PUT    | `/:enquiryId/reply` | Admin  | Reply/Respond to an enquiry                                                                         |

### Preferences `/api/preferences`

| Method | Endpoint | Access | Description                        |
| ------ | -------- | ------ | ---------------------------------- |
| POST   | `/ `     | User   | My theme, font size and sort order |
| PUT    | `/ `     | User   | Update any preference              |

| Method | Endpoint       | Access | Description                                         |
| ------ | -------------- | ------ | --------------------------------------------------- |
| POST   | `/uploadImage` | Admin  | Upload an image to `/uploads` **form field `file`** |

### Static files

| Method | Endpoint          | Access | Description            |
| ------ | ----------------- | ------ | ---------------------- |
| GET    | `/uploads/<file>` | Public | Serves uploaded images |

## Example: Adding a Service

```http
POST /api/services/add
x-auth-token: <admin token>
Content-Type: application/json

{ "name": "Oil Change", "type": "Maintenance", "description": "Engine oil and filter replaced.", "fee": 89.99 }
```

Response `201`: the new service with its `serviceId`.

## Security

- **helmet** security headers
- **CORS**
- **bcrypt**-hashed passwords never return -**JWT** with seven day expiry
- **Joi** validation on every request body
- **Multer** file type and size limits (25MB)
- secrets in `.env` never committed
