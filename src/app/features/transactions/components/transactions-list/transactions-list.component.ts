import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TransactionsService } from '../../services/transactions.service';
import { ExpenseInterface } from '../../interfaces/transaction-interface';

@UntilDestroy()
@Component({
  selector: 'app-transactions-list',
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

  public uniqueCategories : string[] = [];

  public filters = {
    category: '',
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
  };

  constructor(
    private transactionsService: TransactionsService,
  ) { }

  public ngOnInit() {
    this.loadTransactions();
  }

  private loadTransactions() {
    this.transactionsService.loadTransactions().pipe(untilDestroyed(this)).subscribe((data) => {
      if (data?.data.length) {
        this.dataSource = data.data;
        this.filteredData = data.data;
      }
    })
  }

  applyFilter() {
    this.filteredData = this.dataSource.filter(item => {
      const matchesCategory = this.filters.category ? item.categoryName === this.filters.category : true;

      const date: Date = new Date(item.date);
      const from: Date | null = this.filters.dateFrom;
      const to: Date | null = this.filters.dateTo;

      const matchesFrom: boolean = from ? date >= from : true;
      const matchesTo: boolean = to ? date <= to : true;

      return matchesCategory && matchesFrom && matchesTo;
    });

    console.log(this.filteredData);
  }
}
