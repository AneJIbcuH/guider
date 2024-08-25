import { Book } from "./models";

export function isBook(obj: any): obj is Book {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj.title === 'string' &&
      typeof obj.author === 'string' &&
      typeof obj.date === 'string' &&
      typeof obj.price === 'number' &&
      Array.isArray(obj.tags) &&
      obj.tags.every((tag: any) => typeof tag === 'string')
    );
  }
  