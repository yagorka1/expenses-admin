import { Component } from '@angular/core';
import { CategoryInterface } from '../../../categories/interfaces/category-interface';
import { SubcategoryInterface } from '../../../categories/interfaces/subcategory-interface';
import { CURRENCIES } from '../../../../core/constants/currencies';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoriesService } from '../../../categories/services/categories.service';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardFiltersInterface } from '../../interfaces/dashboard-filters.interface';

@UntilDestroy()
@Component({
  selector: 'app-dashboard-filters',
  standalone: false,
  templateUrl: './dashboard-filters.component.html',
  styleUrl: './dashboard-filters.component.scss'
})
export class DashboardFiltersComponent {
  public filters: DashboardFiltersInterface = {
    mainCurrency: CURRENCIES.EUR,
    dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    dateTo: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  };

  public categories: CategoryInterface[] = [];
  public filteredSubcategories: SubcategoryInterface[] = [];
  public subcategories: SubcategoryInterface[] = [];
  public currencies = [CURRENCIES.EUR, CURRENCIES.USD, CURRENCIES.BYN, CURRENCIES.RSD, CURRENCIES.PLN];
  public persons: Array<string> = ['Егор', 'Юлианна', 'Общее'];

  constructor(private categoriesService: CategoriesService, private dashboardService: DashboardService) {
    this.dashboardService.filtersValue = this.filters;

    this.loadCategories();
  }

  private loadCategories() {
    this.categoriesService.loadCategories().pipe(untilDestroyed(this)).subscribe((data) => {
      this.categories = data.data;
    });

    this.categoriesService.loadAllSubcategories().pipe(untilDestroyed(this)).subscribe((data: SubcategoryInterface[]) => {
      this.subcategories = data;
    });
  }

  public onCategoryChange(): void {
    const selectedCategory = this.filters.category;
    this.filteredSubcategories = selectedCategory ? this.subcategories.filter((item: SubcategoryInterface) => (item.categoryId === selectedCategory)) || [] : [];
    this.filters.subcategory = '';
    this.applyFilter();
  }

  public applyFilter(): void {
    this.dashboardService.filtersValue = this.filters;
  }
}
