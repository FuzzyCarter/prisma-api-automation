import { z } from 'zod';
import { BaseController } from '../controllers/base.controller';

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
  tags: Array<{
    name: string;
    description: string;
  }>;
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
    },
    tags: [
      {
        name: 'Users',
        description: 'User management endpoints',
      },
      {
        name: 'Products',
        description: 'Product management endpoints',
      },
    ]
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

      doc.paths[path][route.method] = {
        tags: route.tags,
        summary: route.summary,
        parameters: route.parameters || [],
        requestBody: route.requestBody,
        responses: route.responses
      };
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
      type: 'string',
      format: schema._def.checks?.find((check: any) => check.kind === 'email') ? 'email' : undefined
    };
  }

  if (schema instanceof z.ZodNumber) {
    return {
      type: 'number',
      format: 'float'
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