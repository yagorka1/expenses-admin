import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoriesService } from '../../services/categories.service';
import { CategoryInterface } from '../../interfaces/category-interface';
import { AddSubcategoryDialogComponent } from '../add-category-dialog/add-subcategory-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'app-categories-list',
  standalone: false,
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'description', 'link'];
  public columnHeaders: { [key: string]: { name: string, isSortable: boolean } } = {
    name: { name: 'Название', isSortable: false },
    description: { name: 'Описание', isSortable: false },
    link: { name: 'Подкатегории', isSortable: false },
  };
  public dataSource: CategoryInterface[] = [];
  public filteredData: CategoryInterface[] = [];

  public filters = {
    name: '',
  };

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit() {
    this.loadTransactions();
  }

  private loadTransactions() {
    this.categoriesService.loadCategories().pipe(untilDestroyed(this)).subscribe((data) => {
      if (data?.data.length) {
        this.dataSource = data.data;
        this.filteredData = data.data.map((item: CategoryInterface) => {
          return {
            ...item,
            link: [`/admin/categories/${item.id}/subcategories`],
            linkText: 'Подкатегории'
          };
        });
      }
    })
  }

  public applyFilter() {
    const nameFilter: string = this.filters.name?.toLowerCase().trim();

    this.filteredData = this.dataSource.filter(item => {
      const matchesName: boolean = nameFilter ? item.name.toLowerCase().includes(nameFilter) : true;
      return matchesName;
    });
  }

  public resetFilters() {
    this.filters.name = '';
    this.applyFilter();
  }

  public openAddDialog(): void {
    this.dialog.open(AddSubcategoryDialogComponent).afterClosed().pipe(untilDestroyed(this)).subscribe((data) => {
      if (data) {
        this.resetFilters();
        this.loadTransactions();
      }
    });
  }
}
