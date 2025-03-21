import { Router } from 'express';
import { SwaggerController, SwaggerRoute } from '../types/swagger';

export abstract class BaseController implements SwaggerController {
  protected router: Router;
  public abstract name: string;
  public abstract schema?: any;
  public abstract routes: SwaggerRoute[];

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;

  protected getSwaggerRoutes(): Map<string, SwaggerRouteOptions> {
    return (this as any).swaggerRoutes || new Map();
  }

  protected getSwaggerSchema(): any {
    return (this as any).swaggerSchema;
  }

  protected getSwaggerResponses(methodName: string): any {
    return (this as any).swaggerResponses?.get(methodName) || {};
  }

  public getRouter(): Router {
    return this.router;
  }
} 