import { z } from 'zod';
import { BaseController } from '../controllers/base.controller';
import { UserController } from '../controllers/user.controller';
import { ProductController } from '../controllers/product.controller';
import * as fs from 'fs';
import * as path from 'path';

interface SwaggerDoc {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
  };
  servers: Array<{
    url: string;
    description: string;
  }>;
  paths: Record<string, Record<string, any>>;
  components: {
    schemas: Record<string, any>;
  };
}

interface Operation {
  summary: string;
  responses: Record<string, {
    description: string;
    content?: {
      'application/json': {
        schema: {
          type?: string;
          items?: {
            $ref: string;
          };
          $ref?: string;
        };
      };
    };
  }>;
  parameters?: Array<{
    in: string;
    name: string;
    required: boolean;
    schema: {
      type: string;
      example?: any;
    };
  }>;
  requestBody?: {
    content: {
      'application/json': {
        schema: {
          type?: string;
          required?: string[];
          properties?: Record<string, {
            type: string;
            description?: string;
            example?: any;
          }>;
          $ref?: string;
        };
      };
    };
  };
}

export function generateSwaggerDoc(controllers: BaseController[]): SwaggerDoc {
  const doc: SwaggerDoc = {
    openapi: '3.0.0',
    info: {
      title: 'Prisma API Documentation',
      description: 'API documentation for the Prisma Express application',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    paths: {},
    components: {
      schemas: {}
    }
  };

  // Collect schemas from controllers
  controllers.forEach(controller => {
    const schema = controller.schema;
    if (schema) {
      const schemaName = controller.name;
      doc.components.schemas[schemaName] = zodToSwaggerSchema(schema);
    }
  });

  // Collect routes from controllers
  controllers.forEach(controller => {
    controller.routes.forEach(route => {
      const path = route.path;
      
      if (!doc.paths[path]) {
        doc.paths[path] = {};
      }

      const operation: Operation = {
        summary: route.summary,
        responses: route.responses
      };

      // Add parameters if they exist
      if (route.parameters && route.parameters.length > 0) {
        operation.parameters = route.parameters;
      }

      // Add request body if it exists
      if (route.requestBody) {
        operation.requestBody = route.requestBody;
      }

      doc.paths[path][route.method] = operation;
    });
  });

  return doc;
}

function zodToSwaggerSchema(schema: z.ZodType<any>): any {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const required: string[] = [];
    const properties: Record<string, any> = {};

    Object.entries(shape).forEach(([key, value]) => {
      if (value instanceof z.ZodType) {
        properties[key] = zodToSwaggerSchema(value);
        if (!value.isOptional()) {
          required.push(key);
        }
      }
    });

    return {
      type: 'object',
      properties,
      required: required.length > 0 ? required : undefined
    };
  }

  if (schema instanceof z.ZodString) {
    return {
      type: 'string'
    };
  }

  if (schema instanceof z.ZodNumber) {
    return {
      type: 'number'
    };
  }

  if (schema instanceof z.ZodArray) {
    return {
      type: 'array',
      items: zodToSwaggerSchema(schema.element)
    };
  }

  return { type: 'string' };
}

// Write the Swagger documentation to a file
const controllers: BaseController[] = [
  new UserController(),
  new ProductController()
];

const swaggerDoc = generateSwaggerDoc(controllers);
fs.writeFileSync(
  path.join(__dirname, '../../swagger-output.json'),
  JSON.stringify(swaggerDoc, null, 2)
); 