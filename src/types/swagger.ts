import { z } from 'zod';

export interface SwaggerSchema {
  type: string;
  properties: Record<string, any>;
  required?: string[];
}

export interface SwaggerParameter {
  in: 'path' | 'query' | 'header' | 'body';
  name: string;
  required?: boolean;
  schema: {
    type: string;
    format?: string;
    items?: any;
  };
}

export interface SwaggerResponse {
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
}

export interface SwaggerRoute {
  path: string;
  method: string;
  summary: string;
  tags: string[];
  parameters?: Array<{
    in: string;
    name: string;
    required: boolean;
    schema: {
      type: string;
    };
  }>;
  requestBody?: {
    required: boolean;
    content: {
      'application/json': {
        schema: {
          type?: string;
          required?: string[];
          properties?: Record<string, {
            type: string;
            format?: string;
            description?: string;
          }>;
          $ref?: string;
        };
      };
    };
  };
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
}

export interface SwaggerController {
  name: string;
  schema?: z.ZodType<any>;
  routes: SwaggerRoute[];
}

export function SwaggerSchema(schema: z.ZodType<any>) {
  return function (target: any) {
    // Store schema metadata for later use
    if (!target.swaggerSchema) {
      target.swaggerSchema = schema;
    }
    return target;
  };
}

export function SwaggerResponse(status: number, description: string, schema?: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    if (!target.swaggerResponses) {
      target.swaggerResponses = new Map();
    }
    if (!target.swaggerResponses.has(propertyKey)) {
      target.swaggerResponses.set(propertyKey, {});
    }
    target.swaggerResponses.get(propertyKey)[status] = {
      description,
      schema
    };
    
    return descriptor;
  };
} 