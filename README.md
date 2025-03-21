# prisma-api-automation

https://www.prisma.io/docs

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
     * `npm install -S express`
     * `npm install -S express typescript`
     * `npm install -S @types/express @types/node ts-node nodemon`
     * `npm install -D prisma-generator-express`
     * `npm install -D prisma-zod-generator`
     * `npm i -D dotenv`
     * Add Prisma Express generator to `schema.prisma`
3. Generate Prisma Schema Docs
   * https://github.com/pantharshit00/prisma-docs-generator
   * Install Docs Generator `npm install -D prisma-docs-generator`
   * Add docs generator to `schema.prisma` 
4. Generate Swagger Docs
   * `npm install swagger-autogen and swagger-ui-express`
   * `npm run swagger-autogen`
5. Generate Integration Tests
   * https://github.com/Levetty/prisma-generator-integration-test-runner
   * `npm install -D dredd`
   * `npm install --save-dev start-server-and-test`
   * `npm run test:api`
6. Populate the DB
   * https://github.com/luisrudge/prisma-generator-fake-data
   * `npm install -D prisma-generator-fake-data`

## Workflow

1. Install Dependencies
2. Create prisma file
3. Run `ts-node app.ts`
