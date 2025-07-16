import { uuidv7 } from 'uuidv7';

export abstract class Base {
  id: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor() {
    this.id = uuidv7();
    this.createdAt = new Date();
  }
}
