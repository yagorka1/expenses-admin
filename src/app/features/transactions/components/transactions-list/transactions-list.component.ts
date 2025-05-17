import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TransactionsService } from '../../services/transactions.service';
import { ExpenseInterface } from '../../interfaces/transaction-interface';
import { CategoriesService } from '../../../categories/services/categories.service';
import { CategoryInterface } from '../../../categories/interfaces/category-interface';
import { SubcategoryInterface } from '../../../categories/interfaces/subcategory-interface';
import { CURRENCIES } from '../../../../core/constants/currencies';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-categories-list',
  standalone: false,
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss'
})
export class TransactionsListComponent implements OnInit {
  public displayedColumns: string[] = ['date', 'amount', 'currency', 'categoryName', 'subcategoryName', 'person', 'description'];
  public columnHeaders: { [key: string]: { name: string, isSortable: boolean } } = {
    date: { name: 'Дата', isSortable: true },
    amount: { name: 'Сумма', isSortable: true },
    currency: { name: 'Валюта', isSortable: false },
    categoryName: { name: 'Категория', isSortable: false },
    subcategoryName: { name: 'Подкатегория', isSortable: false },
    person: { name: 'Кто потратил?', isSortable: false },
    description: { name: 'Описание', isSortable: false },
  };
  public dataSource: ExpenseInterface[] = [];
  public filteredData: ExpenseInterface[] = [];

  public filters = {
    category: '',
    subcategory: '',
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
    currency: '',
    person: '',
  };

  public categories: CategoryInterface[] = [];
  public filteredSubcategories: SubcategoryInterface[] = [];
  public subcategories: SubcategoryInterface[] = [];
  public currentSort: string = 'date';
  public currencies = [CURRENCIES.EUR, CURRENCIES.USD, CURRENCIES.BYN, CURRENCIES.RSD, CURRENCIES.PLN];
  public persons: Array<string> = ['Егор', 'Юлианна', 'Общее'];

  constructor(
    private transactionsService: TransactionsService,
    private categoriesService: CategoriesService,
    private router: Router,
  ) {
  }

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

  public openDetails(data: ExpenseInterface): void {
    this.router.navigate([`/admin/transactions/details/${data.id}`]);
  }


  public onCategoryChange(): void {
    const selectedCategory = this.filters.category;
    this.filteredSubcategories = selectedCategory ? this.subcategories.filter((item: SubcategoryInterface) => (item.categoryId === selectedCategory)) || [] : [];
    this.filters.subcategory = '';
    this.applyFilter();
  }

  public sort(field: string): void {
    if (field === 'amount') {
      this.filteredData = [...this.filteredData].sort((a: ExpenseInterface, b: ExpenseInterface) => {
        const amountA: number = a?.amounts['EUR'] ?? 0;
        const amountB: number = b?.amounts['EUR'] ?? 0;

        if (this.currentSort === 'amount') {
          return amountA - amountB;
        } else {
          return amountB - amountA;
        }
      });

      if (this.currentSort === 'amount') {
        this.currentSort = '-amount';
      } else {
        this.currentSort = 'amount';
      }
    }

    if (field === 'date') {
      this.filteredData = [...this.filteredData].sort((a: ExpenseInterface, b: ExpenseInterface) => {
        const dateA: number = a?.date ? new Date(a.date).getTime() : 0;
        const dateB: number = b?.date ? new Date(b.date).getTime() : 0;

        if (this.currentSort === 'date') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });

      if (this.currentSort === 'date') {
        this.currentSort = '-date';
      } else {
        this.currentSort = 'date';
      }
    }
  }

  public applyFilter(): void {
    this.filteredData = this.dataSource
      .filter((item: ExpenseInterface) => {
        const matchesCategory = this.filters.category ? item.categoryId === this.filters.category : true;
        const matchesSubcategory = this.filters.subcategory ? item.subcategoryId === this.filters.subcategory : true;
        const matchesCurrency = this.filters.currency ? item.currency === this.filters.currency : true;
        const matchesPersons = this.filters.person ? item.person === this.filters.person : true;

        const date: Date = new Date(item.date);
        const from: Date | null = this.filters.dateFrom;
        const to: Date | null = this.filters.dateTo
          ? new Date(new Date(this.filters.dateTo).setHours(23, 59, 59, 999))
          : null;

        const matchesFrom: boolean = from ? date >= from : true;
        const matchesTo: boolean = to ? date <= to : true;

        return matchesCategory && matchesSubcategory && matchesFrom && matchesTo && matchesCurrency && matchesPersons;
      })
      .map((item: ExpenseInterface) => ({
        ...item,
      }));
  }
}
