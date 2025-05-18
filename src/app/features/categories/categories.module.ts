import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesRoutingModule } from './categories-routing.module';
import { InputModule } from '../../components/input/input.module';
import { ButtonModule } from '../../components/button/button.module';
import { TableComponent } from '../../components/table/table.component';
import { MaterialModule } from '../../core/modules/material/material.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { AddSubcategoryDialogComponent } from './components/add-category-dialog/add-subcategory-dialog.component';
import { SubcategoriesListComponent } from './components/subcategories-list/subcategories-list.component';
import { AddCategoryDialogComponent } from './components/add-subcategory-dialog/add-category-dialog.component';

@NgModule({
  declarations: [CategoriesComponent, CategoriesListComponent, AddSubcategoryDialogComponent, AddCategoryDialogComponent, SubcategoriesListComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
    TableComponent,
    FormsModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [
    CategoriesComponent
  ],
  providers: [],
})
export class CategoriesModule {}
