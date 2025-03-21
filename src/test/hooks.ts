import { prisma } from '../lib/prisma';

const hooks = {
  beforeEach: async (transaction: any) => {
    // Clean up the database before each test
    await prisma.user.deleteMany();
    await prisma.product.deleteMany();
  },

  afterEach: async (transaction: any) => {
    // Clean up after each test
    await prisma.user.deleteMany();
    await prisma.product.deleteMany();
  },

  beforeAll: async () => {
    // Any setup needed before all tests
  },

  afterAll: async () => {
    // Clean up after all tests
    await prisma.user.deleteMany();
    await prisma.product.deleteMany();
    await prisma.$disconnect();
  }
};

export default hooks; 