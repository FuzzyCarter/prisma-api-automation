# Prisma API Automation

A RESTful API built with Express.js, Prisma, and TypeScript, featuring automatic OpenAPI/Swagger documentation generation and API testing with Dredd.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL database

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd prisma-api-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and update your database connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
   ```

4. Initialize the database:
   ```bash
   npx prisma db push
   ```

## Running the Application

1. Generate Swagger documentation:
   ```bash
   npm run swagger-autogen
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`.
Swagger documentation will be available at `http://localhost:3000/api-docs`.

## Testing

### Running API Tests with Dredd

1. Make sure the application is running in a separate terminal.

2. Run the Dredd tests:
   ```bash
   npm run test:api
   ```

This will validate all API endpoints against the OpenAPI specification.

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create a new user
- `PUT /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create a new product
- `PUT /products/:id` - Update product by ID
- `DELETE /products/:id` - Delete product by ID

## Development

### Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm start` - Start the production server
- `npm run swagger-autogen` - Generate Swagger documentation
- `npm run test:api` - Run API tests with Dredd

### Project Structure

```
prisma-api-automation/
├── src/
│   ├── controllers/     # Route controllers
│   ├── lib/            # Shared utilities
│   ├── types/          # TypeScript type definitions
│   └── app.ts          # Express application setup
├── prisma/
│   └── schema.prisma   # Prisma schema
└── swagger-output.json # Generated Swagger documentation
```

## Contributing New APIs

### Step 1: Update Prisma Schema

1. Open `prisma/schema.prisma` and add your new model:
   ```prisma
   model NewModel {
     id        Int      @id @default(autoincrement())
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
     // Add your fields here
     name      String
     description String?
   }
   ```

2. Apply the schema changes:
   ```bash
   npx prisma db push
   ```

### Step 2: Create Controller

1. Create a new file in `src/controllers/` (e.g., `new-model.controller.ts`):
   ```typescript
   import { Request, Response } from 'express';
   import { prisma } from '../lib/prisma';
   import { BaseController } from './base.controller';
   import { SwaggerRoute } from '../types/swagger';
   import { newModelSchema } from '../types/validation';

   export class NewModelController extends BaseController {
     public name = 'NewModel';
     public schema = newModelSchema;
     public routes: SwaggerRoute[] = [
       // Define your routes here following the existing pattern
     ];

     // Implement your controller methods
   }
   ```

### Step 3: Add Validation Schema

1. Create or update validation schema in `src/types/validation.ts`:
   ```typescript
   import { z } from 'zod';

   export const newModelSchema = z.object({
     name: z.string(),
     description: z.string().optional(),
     // Add your validation rules
   });
   ```

### Step 4: Update App Configuration

1. Register your controller in `src/app.ts`:
   ```typescript
   import { NewModelController } from './controllers/new-model.controller';

   // In the app setup
   const newModelController = new NewModelController();
   app.use('/new-models', newModelController.getRouter());
   ```

### Step 5: Generate Documentation

1. Run Swagger generation:
   ```bash
   npm run swagger-autogen
   ```

### Step 6: Test Your API

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Run Dredd tests:
   ```bash
   npm run test:api
   ```

### API Implementation Checklist

- [ ] Prisma schema model defined
- [ ] Controller class created
- [ ] Validation schema added
- [ ] Routes configured in controller
- [ ] CRUD operations implemented
- [ ] Controller registered in app.ts
- [ ] Swagger documentation generated
- [ ] API endpoints tested with Dredd
- [ ] Example values added for all parameters

### Best Practices

1. **Route Structure**
    - Use plural nouns for resource endpoints (e.g., `/users`, `/products`)
    - Follow RESTful conventions for HTTP methods
    - Include proper parameter examples for Dredd testing

2. **Validation**
    - Always validate input using Zod schemas
    - Include meaningful error messages
    - Handle edge cases appropriately

3. **Documentation**
    - Add clear descriptions for all endpoints
    - Include example values for all parameters
    - Document success and error responses

4. **Testing**
    - Ensure all endpoints have example values for Dredd
    - Test both success and error scenarios
    - Validate response schemas

## Additional Resources

For more detailed information about the tools used in this project:

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Dredd Documentation](https://dredd.org/en/latest/)
- [OpenAPI/Swagger Documentation](https://swagger.io/docs/)

https://www.prisma.io/docs

## Notes for continued development

1. Create Prisma schema
    * User
        * GET /api/users
        * GET /api/users/:id
        * POST /api/users/:id
        * PUT /api/users
        * DELETE /api/users/:id
    * Product
        * GET /api/product
        * GET /api/product/:id
        * POST /api/product/:id
        * PUT /api/product
        * DELETE /api/product/:id
    * Order
        * GET /api/order
        * GET /api/order/:id
        * POST /api/order/:id
        * PUT /api/order
        * DELETE /api/order/:id
    * Review
        * GET /api/review
        * GET /api/review/:id
        * POST /api/review/:id
        * PUT /api/review
        * DELETE /api/order/:id
    * Additionally, implement at least one complex endpoint that spans multiple models, for example:
        * GET /api/users/:id/order-summary - Gets a summary of all orders for a user
        * POST /api/users/:id/cancel-orders - Cancels all pending orders for a user
2. Generate Typescript Endpoint
    * Prisma Express Generator: https://github.com/multipliedtwice/prisma-generator-express
        * `npm install express -S`
        * `npm install express typescript -S`
        * `npm install -S @types/express @types/node ts-node nodemon`
        * `npm install -S prisma-generator-express`
        * `npm install -S prisma-zod-generator`
        * Add Prisma Express generator to `schema.prisma`
3. Generate Prisma Schema Docs
    * https://github.com/pantharshit00/prisma-docs-generator
    * Install Docs Generator `npm install -D prisma-docs-generator`
    * Add docs generator to `schema.prisma`
4. Generate Swagger Docs
    * https://github.com/wesleytodd/express-openapi
    * https://github.com/prisma/prisma/discussions/5757
    * https://github.com/valentinpalkovic/prisma-json-schema-generator →  https://www.npmjs.com/package/@openapi-contrib/json-schema-to-openapi-schema
    * Install json schema generator `npm install prisma-json-schema-generator --save-dev`
    * Add json schema generator to `schema.prisma`
    * Install json to openapi generator `npm install --save @openapi-contrib/json-schema-to-openapi-schema`
    * Run json to openapi generator
    * https://openapi.tools/
    * https://openapi.tools/#data-validators
    * https://openapi-generator.tech/docs/generators
5. Generate Integration Tests
    * https://github.com/Levetty/prisma-generator-integration-test-runner
6. Populate the DB
    * https://github.com/luisrudge/prisma-generator-fake-data

## Workflow

1. Install Dependencies
2. Create prisma file
