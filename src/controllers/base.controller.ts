import { Router } from 'express';
import { SwaggerController, SwaggerRoute } from '../types/swagger';

export abstract class BaseController implements SwaggerController {
  public router: Router;
  public abstract name: string;
  public abstract schema?: any;
  public abstract routes: SwaggerRoute[];

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;

  protected getSwaggerRoutes(): Map<string, SwaggerRoute> {
    const routeMap = new Map<string, SwaggerRoute>();
    this.routes.forEach(route => {
      routeMap.set(`${route.method.toUpperCase()} ${route.path}`, route);
    });
    return routeMap;
  }

  public getRouter(): Router {
    return this.router;
  }
} 