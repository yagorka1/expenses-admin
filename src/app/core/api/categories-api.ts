export const CATEGORIES_API = {
  categoriesList: 'categories/categories-list',
  subcategoriesList: (id: string) => `categories/subcategories-list/${id}`,
  createCategory: 'categories/create-category',
  createSubcategory: 'categories/create-subcategory',
};
