import {  } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeUser() {
  return {
    email: faker.internet.email(),
    name: undefined,
    address: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    email: faker.internet.email(),
    name: undefined,
    address: undefined,
  };
}
export function fakeProduct() {
  return {
    name: faker.person.fullName(),
    description: undefined,
    price: faker.number.float(),
  };
}
export function fakeProductComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    name: faker.person.fullName(),
    description: undefined,
    price: faker.number.float(),
  };
}
