import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoriesService } from '../../services/categories.service';
import { CategoryInterface } from '../../interfaces/category-interface';
import { AddSubcategoryDialogComponent } from '../add-category-dialog/add-subcategory-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SubcategoryInterface } from '../../interfaces/subcategory-interface';
import { ActivatedRoute } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-subcategories-list',
  standalone: false,
  templateUrl: './subcategories-list.component.html',
  styleUrl: './subcategories-list.component.scss'
})
export class SubcategoriesListComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'description', 'isNecessary'];
  public columnHeaders: { [key: string]: string } = {
    name: 'Название',
    description: 'Описание',
    isNecessary: 'Обязательные траты?'
  };
  public dataSource: CategoryInterface[] = [];
  public filteredData: CategoryInterface[] = [];

  public filters = {
    name: '',
  };

  public categoryId: string;

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.categoryId = this.route.snapshot.params['id'];
  }

  public ngOnInit() {
    this.loadSubcategories();
  }

  private loadSubcategories() {
    this.categoriesService.loadSubcategories(this.categoryId).pipe(untilDestroyed(this)).subscribe((data: SubcategoryInterface[]) => {
      if (data.length) {
        this.dataSource = data;
        this.filteredData = data.map((item: SubcategoryInterface) => {
          return {
            ...item,
            isNecessary: item.isNecessary ? 'Да' : 'Нет',
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
    this.dialog.open(AddSubcategoryDialogComponent, {
      data: {
        categoryId: this.categoryId,
      }
    }).afterClosed().pipe(untilDestroyed(this)).subscribe((data) => {
      if (data) {
        this.resetFilters();
        this.loadSubcategories();
      }
    });
  }
}
