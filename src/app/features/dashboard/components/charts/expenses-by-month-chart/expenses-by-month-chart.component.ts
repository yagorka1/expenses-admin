import { Component, Input, OnChanges } from '@angular/core';
import { CHAT_COLORS } from '../../../../../core/constants/chat-colors';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ExpenseInterface } from '../../../../transactions/interfaces/transaction-interface';
import { DashboardService } from '../../../services/dashboard.service';
import { CURRENCIES } from '../../../../../core/constants/currencies';

@Component({
  selector: 'app-expenses-by-month-chart',
  standalone: false,
  templateUrl: './expenses-by-month-chart.component.html',
  styleUrl: './expenses-by-month-chart.component.scss'
})
export class ExpensesByMonthChartComponent implements OnChanges {
  @Input()
  public data: ExpenseInterface[] = [];

  @Input()
  public totalAmount: number = 0;

  public currency: string = CURRENCIES.EUR;

  public multi: any[] = [];

  public animations: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = 'Месяц';
  public yAxisLabel: string = 'Population';
  public timeline: boolean = true;

  public colors: string[] = CHAT_COLORS

  public colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: CHAT_COLORS,
  };

  constructor(private dashboardService: DashboardService) {}

  public ngOnChanges(): void {
    if (this.data?.length) {
      this.currency = this.dashboardService.filtersValue.mainCurrency;
      this.multi = this.groupExpensesByMonth(this.data, this.currency);
      this.yAxisLabel = `Траты в ${this.currency}`;
    }
  }

  public groupExpensesByMonth(data: ExpenseInterface[], currency: string) {
    const grouped: { [key: string]: number } = {};
    const keyDateMap: { [key: string]: Date } = {};

    data.forEach((item: ExpenseInterface) => {
      const date: Date = new Date(item.date);
      const monthKey: string = date.toLocaleString('ru-RU', { month: 'long' }) + ` (${date.getFullYear()})`;

      const value: number = item.amounts[currency] || 0;

      if (!grouped[monthKey]) {
        grouped[monthKey] = 0;
        keyDateMap[monthKey] = new Date(date.getFullYear(), date.getMonth());
      }

      grouped[monthKey] += value;
    });

    const sortedEntries = Object.entries(grouped).sort(
      ([a], [b]) => keyDateMap[a].getTime() - keyDateMap[b].getTime()
    );

    return [
      {
        name: 'Расходы по месяцам',
        series: sortedEntries.map(([month, value]) => ({
          name: month.toLocaleUpperCase(),
          value: +value.toFixed(2),
        }))
      }
    ];
  }
}
