import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CATEGORIES_API } from '../../../core/api/categories-api';
import { CategoryInterface } from '../interfaces/category-interface';
import { SubcategoryInterface } from '../interfaces/subcategory-interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private http: HttpClient,
  ) {}


  public loadCategories(): Observable<any> {
    return this.http.get(CATEGORIES_API.categoriesList).pipe(
      tap((resp) => {
       return resp;
      }),
    );
  }

  public createCategory(category: Partial<CategoryInterface>): Observable<CategoryInterface> {
    return this.http.post<{ data: CategoryInterface }>(CATEGORIES_API.createCategory, category).pipe(
      map((response: { data: CategoryInterface }) => response.data),
    );
  }

  public loadSubcategories(id: string): Observable<SubcategoryInterface[]> {
    return this.http.get<{ data: SubcategoryInterface[] }>(CATEGORIES_API.subcategoriesList(id)).pipe(
      map(response => response.data),
    );
  }

  public loadAllSubcategories(): Observable<SubcategoryInterface[]> {
    return this.http.get<{ data: SubcategoryInterface[] }>(CATEGORIES_API.allSubcategoriesList).pipe(
      map(response => response.data),
    );
  }

  public createSubcategory(subCategory: Partial<SubcategoryInterface>): Observable<SubcategoryInterface> {
    return this.http.post<{ data: SubcategoryInterface }>(CATEGORIES_API.createSubcategory, subCategory).pipe(
      map((response: { data: SubcategoryInterface }) => response.data),
    );
  }
}
