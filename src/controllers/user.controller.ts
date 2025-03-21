import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { BaseController } from './base.controller';
import { SwaggerRoute } from '../types/swagger';
import { userSchema } from '../types/validation';

export class UserController extends BaseController {
  public name = 'User';
  public schema = userSchema;
  public routes: SwaggerRoute[] = [
    {
      path: '/users',
      method: 'get',
      summary: 'Get all users',
      responses: {
        '200': {
          description: 'List of users',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          }
        }
      }
    },
    {
      path: '/users/{id}',
      method: 'get',
      summary: 'Get user by ID',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { 
            type: 'integer'
          },
          example: 1
        }
      ],
      responses: {
        '200': {
          description: 'User details',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        '404': {
          description: 'User not found'
        }
      }
    },
    {
      path: '/users',
      method: 'post',
      summary: 'Create a new user',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'name', 'address'],
              properties: {
                email: {
                  type: 'string',
                  description: 'User email address',
                  example: 'user@example.com'
                },
                name: {
                  type: 'string',
                  description: 'User name',
                  example: 'John Doe'
                },
                address: {
                  type: 'string',
                  description: 'User address',
                  example: '123 Main St'
                }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        }
      }
    },
    {
      path: '/users/{id}',
      method: 'put',
      summary: 'Update user by ID',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { 
            type: 'integer'
          },
          example: 1
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  description: 'User email address',
                  example: 'user@example.com'
                },
                name: {
                  type: 'string',
                  description: 'User name',
                  example: 'John Doe'
                },
                address: {
                  type: 'string',
                  description: 'User address',
                  example: '123 Main St'
                }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'User updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        '404': {
          description: 'User not found'
        }
      }
    },
    {
      path: '/users/{id}',
      method: 'delete',
      summary: 'Delete user by ID',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { 
            type: 'integer'
          },
          example: 1
        }
      ],
      responses: {
        '204': {
          description: 'User deleted successfully'
        },
        '404': {
          description: 'User not found'
        }
      }
    }
  ];

  private async getAllUsers(_req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  private async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  private async createUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.create({
        data: req.body,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  private async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }

  private async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }

  protected initializeRoutes(): void {
    this.router.get('/', this.getAllUsers.bind(this));
    this.router.get('/:id', this.getUserById.bind(this));
    this.router.post('/', this.createUser.bind(this));
    this.router.put('/:id', this.updateUser.bind(this));
    this.router.delete('/:id', this.deleteUser.bind(this));
  }
} 