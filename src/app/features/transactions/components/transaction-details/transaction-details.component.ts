import { Component } from '@angular/core';
import { ExpenseInterface } from '../../interfaces/transaction-interface';
import { TransactionsService } from '../../services/transactions.service';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DatePipe } from '@angular/common';
import { CURRENCIES } from '../../../../core/constants/currencies';

@UntilDestroy()
@Component({
  selector: 'app-transaction-details',
  standalone: false,
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})
export class TransactionDetailsComponent {
  public data: ExpenseInterface;
  public viewData: Array<{ key: string, value: any }> = [];
  public amountsViewData: Array<{ key: string, value: any }> = [];
  private id: string;

  constructor(
    private transactionsService: TransactionsService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.loadData();
  }

  private loadData() {
    this.transactionsService.loadTransaction(this.id).pipe(untilDestroyed(this)).subscribe((data) => {
      this.data = data.data;

      this.viewData = [
        { key: 'Id', value: this.data.id },
        { key: 'Дата', value: this.datePipe.transform(this.data.date) },
        { key: 'Сумма', value: this.data.amount + ' ' + this.data.currency },
        { key: 'Категория', value: this.data.categoryName },
        { key: 'Подкатегория', value: this.data.subcategoryName },
        { key: 'Кто потратил?', value: this.data.person },
        { key: 'Описание', value: this.data.description },
      ];

      this.amountsViewData = Object.entries(this.data.amounts).map(([key, value]) => ({
        key: key, value: value + ' ' + key,
      }));
    })
  }
}
