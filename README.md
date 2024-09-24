# SSL Checker Tool - Backend

This backend service provides a REST API for checking SSL certificates for a given domain. It extracts, validates, and verifies SSL certificate details and returns comprehensive information about the certificate's status.

## Features

The API provides the following functionalities:

- **Fetch SSL Certificate**: Retrieves the SSL certificate for the specified domain.
- **Extract Metadata**: Extracts important metadata from the SSL certificate, such as issuer, subject, and validity dates.
- **Validate Expiry Date**: Checks whether the SSL certificate is expired or still valid.
- **Certificate Chain Validation**: Verifies if the SSL certificate chain is valid and whether the root certificate can be trusted.
- **Domain Validation**: Ensures the SSL certificate is valid for the input domain.
- **Revocation Status**: Checks if the SSL certificate has been revoked by referencing the CRL (Certificate Revocation List) or OCSP (Online Certificate Status Protocol).

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework used to build the RESTful API.

## Getting Started

### Prerequisites

Ensure that you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/deepanwar/ssl-checker-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ssl-checker-backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Running the Application

To start the server locally:

```bash
npm start
```

or

```bash
yarn start
```

The server will run at `http://localhost:8080`.

### API Testing

You can use tools like **Postman** or **cURL** to test the API. Send a `POST` request to `http://localhost:8080/api/check-ssl` with a JSON body containing the domain name to check its SSL certificate.
