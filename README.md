# Simple API with JWT Authentication

This is a simple Node.js API with JWT (JSON Web Token) authentication and rate limiting middleware implemented using Express.js.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Rate Limiting](#rate-limiting)
- [License](#license)

## Features
- Authenticate users with JWT token.
- Implement rate limiting to prevent abuse and maintain server stability.

## Installation
1. Clone the repository: `git clone https://github.com/yourusername/simple-api-jwt.git`
2. Navigate to the project directory: `cd simple-api-jwt`
3. Install dependencies: `npm install`

## Usage
1. Start the server: `node app.js`
2. Access the API at: `http://localhost:3000`

## Endpoints
- `POST /login`: Authenticate user and receive JWT token.
- `GET /api/data`: Fetch data with JWT authentication.

## Rate Limiting
- The API is rate-limited to prevent abuse.
- Each IP address is limited to 10 requests per minute.
- If the limit is exceeded, a message "Too many requests from this IP, please try again later" will be sent.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
