import { z } from 'zod';

export interface SwaggerParameter {
  in: 'path' | 'query' | 'header' | 'body';
  name: string;
  required?: boolean;
  schema: {
    type: string;
  };
  example?: any;
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
  parameters?: Array<{
    in: string;
    name: string;
    required: boolean;
    schema: {
      type: string;
    };
    example?: any;
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

export function SwaggerResponse(status: number, description: string, schema?: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    
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