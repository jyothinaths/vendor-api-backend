# Vendor API - Spring Boot Testing Backend

A minimal Spring Boot 3.x backend API for practicing API testing with Postman. This project implements JWT authentication, role-based access control, and a simple Vendor CRUD module.

## Technologies

- **Java 17**
- **Spring Boot 3.2.0**
- **Maven**
- **H2 In-Memory Database**
- **Spring Security with JWT**
- **Lombok**

## Features

- JWT-based authentication
- Role-based access control (ADMIN and ORG)
- RESTful Vendor CRUD operations
- In-memory H2 database
- CORS enabled for Postman testing

## Demo Users

The application comes with two hardcoded users for testing:

| Username | Password | Role  |
|----------|----------|-------|
| admin    | password | ADMIN |
| org      | password | ORG   |

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+

### Running the Application

1. **Clone or download this project**

2. **Navigate to project directory**
   ```bash
   cd vendor-api
   ```

3. **Run with Maven**
   ```bash
   mvn spring-boot:run
   ```

4. **The application will start on** `http://localhost:8080`

## API Endpoints

### Authentication

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin",
  "role": "ADMIN"
}
```

### Vendor Management

All vendor endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-token-here>
```

#### Create Vendor (ADMIN only)
```
POST /api/vendors
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Acme Corporation",
  "email": "contact@acme.com",
  "status": "ACTIVE"
}
```

#### Get All Vendors (ADMIN & ORG)
```
GET /api/vendors
Authorization: Bearer <token>
```

#### Get Vendor by ID (ADMIN & ORG)
```
GET /api/vendors/{id}
Authorization: Bearer <token>
```

#### Update Vendor (ADMIN only)
```
PUT /api/vendors/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Acme Corporation Updated",
  "email": "newcontact@acme.com",
  "status": "INACTIVE"
}
```

#### Delete Vendor (ADMIN only)
```
DELETE /api/vendors/{id}
Authorization: Bearer <token>
```

## Testing with Postman

### 1. Login to Get Token

1. Create a POST request to `http://localhost:8080/api/auth/login`
2. Set body to raw JSON:
   ```json
   {
     "username": "admin",
     "password": "password"
   }
   ```
3. Send the request and copy the `token` from the response

### 2. Use Token for Protected Endpoints

1. For any vendor endpoint, add Authorization header:
   - Key: `Authorization`
   - Value: `Bearer <paste-your-token-here>`

### 3. Test Different Roles

- Login as **admin** to test all endpoints
- Login as **org** to verify read-only access (GET requests work, POST/PUT/DELETE should return 403 Forbidden)

### 4. Sample Test Flow

1. **Login as admin** → Get token
2. **Create a vendor** → POST with admin token
3. **Get all vendors** → GET with admin token
4. **Update vendor** → PUT with admin token
5. **Login as org** → Get org token
6. **Try to create vendor** → Should fail with 403
7. **Get all vendors** → Should succeed with org token
8. **Delete vendor** → DELETE with admin token

## Project Structure

```
src/main/java/com/example/vendorapi/
├── VendorApiApplication.java     # Main application
├── config/
│   ├── SecurityConfig.java       # Security & user initialization
│   ├── JwtUtil.java              # JWT token utilities
│   └── JwtAuthenticationFilter.java # JWT filter
├── controller/
│   ├── AuthController.java       # Login endpoint
│   └── VendorController.java     # Vendor CRUD endpoints
├── service/
│   ├── AuthService.java          # Authentication logic
│   └── VendorService.java        # Vendor business logic
├── repository/
│   ├── UserRepository.java       # User data access
│   └── VendorRepository.java     # Vendor data access
├── entity/
│   ├── User.java                 # User entity
│   ├── Vendor.java               # Vendor entity
│   ├── Role.java                 # Role enum
│   └── VendorStatus.java         # Status enum
└── dto/
    ├── LoginRequest.java         # Login request
    ├── LoginResponse.java        # Login response
    ├── VendorRequest.java        # Vendor create/update
    └── VendorResponse.java       # Vendor response
```

## Database

The application uses H2 in-memory database. You can access the H2 console at:
```
http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:vendordb
Username: sa
Password: (leave empty)
```

## Notes

- This is a **demo project** for API testing practice, not production-ready
- JWT tokens expire after 24 hours (configurable in `application.properties`)
- All data is stored in-memory and will be lost when the application stops
- CORS is enabled for all origins to facilitate Postman testing
