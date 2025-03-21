import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { BaseController } from './base.controller';
import { SwaggerRoute } from '../types/swagger';
import { createProductSchema } from '../types/validation';

export class ProductController extends BaseController {
  public name = 'Product';
  public schema = createProductSchema;
  public routes: SwaggerRoute[] = [
    {
      path: '/products',
      method: 'get',
      summary: 'Get all products',
      tags: ['Products'],
      responses: {
        '200': {
          description: 'List of products',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          }
        }
      }
    },
    {
      path: '/products/{id}',
      method: 'get',
      summary: 'Get product by ID',
      tags: ['Products'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' }
        }
      ],
      responses: {
        '200': {
          description: 'Product details',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product'
              }
            }
          }
        },
        '404': {
          description: 'Product not found'
        }
      }
    },
    {
      path: '/products',
      method: 'post',
      summary: 'Create a new product',
      tags: ['Products'],
      responses: {
        '201': {
          description: 'Product created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product'
              }
            }
          }
        }
      }
    },
    {
      path: '/products/{id}',
      method: 'put',
      summary: 'Update product by ID',
      tags: ['Products'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' }
        }
      ],
      responses: {
        '200': {
          description: 'Product updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product'
              }
            }
          }
        },
        '404': {
          description: 'Product not found'
        }
      }
    },
    {
      path: '/products/{id}',
      method: 'delete',
      summary: 'Delete product by ID',
      tags: ['Products'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' }
        }
      ],
      responses: {
        '204': {
          description: 'Product deleted successfully'
        },
        '404': {
          description: 'Product not found'
        }
      }
    }
  ];

  private async getAllProducts(_req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  private async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  private async createProduct(req: Request, res: Response) {
    try {
      const product = await prisma.product.create({
        data: req.body,
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product' });
    }
  }

  private async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await prisma.product.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  }

  private async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.product.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }

  protected initializeRoutes(): void {
    this.router.get('/', this.getAllProducts.bind(this));
    this.router.get('/:id', this.getProductById.bind(this));
    this.router.post('/', this.createProduct.bind(this));
    this.router.put('/:id', this.updateProduct.bind(this));
    this.router.delete('/:id', this.deleteProduct.bind(this));
  }
} 