export type Book = {
  title: string;
  author: string;
  date: string;
  price: number;
  tags: string[];
};

export type Order = "asc" | "desc" | '';
export type By = "price" | "author" | "date" | '';

export type OrderBy = {
  order: Order;
  by: By;
};
