import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TransactionsService } from '../../services/transactions.service';
import { ExpenseInterface } from '../../interfaces/transaction-interface';
import { CategoriesService } from '../../../categories/services/categories.service';
import { CategoryInterface } from '../../../categories/interfaces/category-interface';
import { SubcategoryInterface } from '../../../categories/interfaces/subcategory-interface';
import { DatePipe } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-categories-list',
  standalone: false,
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss'
})
export class TransactionsListComponent implements OnInit {
  public displayedColumns: string[] = ['date', 'amount', 'currency', 'categoryName', 'subcategoryName', 'description'];
  public columnHeaders: { [key: string]: string } = {
    date: 'Дата',
    amount: 'Сумма',
    currency: 'Валюта',
    categoryName: 'Категория',
    subcategoryName: 'Подкатегория',
    description: 'Описание',
  };
  public dataSource: ExpenseInterface[] = [];
  public filteredData: ExpenseInterface[] = [];

  public filters = {
    category: '',
    subcategory: '',
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
  };

  public categories: CategoryInterface[] = [];
  public filteredSubcategories: SubcategoryInterface[] = [];
  public subcategories: SubcategoryInterface[] = [];

  constructor(
    private transactionsService: TransactionsService,
    private categoriesService: CategoriesService,
    private datePipe: DatePipe,
  ) { }

  public ngOnInit() {
    this.loadTransactions();
    this.loadCategories();
  }

  private loadTransactions() {
    this.transactionsService.loadTransactions().pipe(untilDestroyed(this)).subscribe((data) => {
      if (data?.data.length) {
        this.dataSource = data.data;
        this.filteredData = data.data.map((item: ExpenseInterface) => ({
          ...item,
          date: this.datePipe.transform(item.date, 'dd-MM-yyyy'),
        }));
      }
    })
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
    this.filteredData = this.dataSource
    .filter((item: ExpenseInterface) => {
      const matchesCategory = this.filters.category ? item.categoryId === this.filters.category : true;
      const matchesSubcategory = this.filters.subcategory ? item.subcategoryId === this.filters.subcategory : true;

      const date: Date = new Date(item.date);
      const from: Date | null = this.filters.dateFrom;
      const to: Date | null = this.filters.dateTo
        ? new Date(new Date(this.filters.dateTo).setHours(23, 59, 59, 999))
        : null;

      const matchesFrom: boolean = from ? date >= from : true;
      const matchesTo: boolean = to ? date <= to : true;

      return matchesCategory && matchesSubcategory && matchesFrom && matchesTo;
    })
    .map((item: ExpenseInterface) => ({
      ...item,
      date: this.datePipe.transform(item.date, 'dd-MM-yyyy') || item.date
    }));
  }
}
