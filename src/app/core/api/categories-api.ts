export const CATEGORIES_API = {
  categoriesList: 'categories/categories-list',
  subcategoriesList: (id: string) => `categories/subcategories-list/${id}`,
  allSubcategoriesList: `categories/subcategories-list`,
  createCategory: 'categories/create-category',
  createSubcategory: 'categories/create-subcategory',
};
