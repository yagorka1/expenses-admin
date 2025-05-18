import { Component, Input, OnChanges } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ExpenseInterface } from '../../../../transactions/interfaces/transaction-interface';
import { DashboardService } from '../../../services/dashboard.service';
import { CHAT_COLORS } from '../../../../../core/constants/chat-colors';
import { CURRENCIES } from '../../../../../core/constants/currencies';

@Component({
  selector: 'app-categories-subcategories-chart',
  standalone: false,
  templateUrl: './categories-subcategories-chart.component.html',
  styleUrl: './categories-subcategories-chart.component.scss'
})
export class CategoriesSubcategoriesChartComponent implements OnChanges {
  @Input()
  public data: ExpenseInterface[] = [];

  @Input()
  public totalAmount: number = 0;

  public colors: string[] = CHAT_COLORS

  public colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: CHAT_COLORS,
  };

  public currency: string = CURRENCIES.EUR;

  public multi: any[] = [ ];

  public showXAxis: boolean = true;
  public showYAxis: boolean = true;
  public gradient: boolean = false;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = 'Подкатегории';
  public showYAxisLabel: boolean = true;
  public yAxisLabel: string = 'Траты';

  constructor(private dashboardService: DashboardService) {}

  public ngOnChanges(): void {
    if (this.data?.length) {
      this.currency = this.dashboardService.filtersValue.mainCurrency;
      this.multi = this.transformToSubcategoryTotals(this.data, this.currency);
      this.yAxisLabel = `Траты в ${this.currency}`;
    }
  }

  public transformToSubcategoryTotals(data: any[], currency: string): any[] {
    const subcategoryMap = new Map<string, number>();

    for (const item of data) {
      const subcategory = item.subcategoryName;
      const amount = item.amounts?.[currency] ?? 0;

      subcategoryMap.set(
        subcategory,
        (subcategoryMap.get(subcategory) ?? 0) + amount
      );
    }

    return Array.from(subcategoryMap.entries()).map(([name, value]) => ({
      name,
      value: +value.toFixed(2),
    })).sort((a, b) => b.value - a.value);
  }
}
