import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ExpenseInterface } from '../../../transactions/interfaces/transaction-interface';
import { DashboardFiltersInterface } from '../../interfaces/dashboard-filters.interface';
import { TransactionsService } from '../../../transactions/services/transactions.service';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public dataSource: ExpenseInterface[] = [];
  public filteredData: ExpenseInterface[] = [];
  public currentFilters: DashboardFiltersInterface;
  public totalAmount: number = 0;

  constructor(private dashboardService: DashboardService, private transactionsService: TransactionsService) {
    this.loadTransactions();

    this.dashboardService.filtersValue$.pipe(untilDestroyed(this)).subscribe((data) => {
      this.filterData(data);
    })
  }

  private loadTransactions() {
    this.transactionsService.loadTransactions().pipe(untilDestroyed(this)).subscribe((data) => {
      if (data?.data.length) {
        this.dataSource = data.data;

        this.filterData(this.currentFilters);
      }
    })
  }

  private filterData(filters: DashboardFiltersInterface): void {
    this.currentFilters = filters;

    this.filteredData = this.dataSource
      .filter((item: ExpenseInterface) => {
        const matchesCategory = filters.category ? item.categoryId === filters.category : true;
        const matchesSubcategory = filters.subcategory ? item.subcategoryId === filters.subcategory : true;
        const matchesCurrency = filters.currency ? item.currency === filters.currency : true;
        const matchesPersons = filters.person ? item.person === filters.person : true;

        const date: Date = new Date(item.date);
        const from: Date | undefined = filters.dateFrom;
        const to: Date | null = filters.dateTo
          ? new Date(new Date(filters.dateTo).setHours(23, 59, 59, 999))
          : null;

        const matchesFrom: boolean = from ? date >= from : true;
        const matchesTo: boolean = to ? date <= to : true;

        return matchesCategory && matchesSubcategory && matchesFrom && matchesTo && matchesCurrency && matchesPersons;
      })
      .map((item: ExpenseInterface) => ({
        ...item,
      }));

    this.totalAmount = this.filteredData.reduce((sum: number, i: ExpenseInterface) => sum + i.amounts[this.currentFilters.mainCurrency], 0);
  }
}
