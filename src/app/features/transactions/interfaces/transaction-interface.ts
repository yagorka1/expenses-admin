export interface ExpenseInterface {
  id: string;
  amount: number;
  currency: string;
  categoryName: string;
  categoryId: string;
  subcategoryName: string;
  subcategoryId: string;
  person: string;
  description: string;
  date: string;
  amounts: { [key: string]: number };
}
