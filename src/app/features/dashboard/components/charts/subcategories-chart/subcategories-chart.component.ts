import { Component, Input, OnChanges } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ExpenseInterface } from '../../../../transactions/interfaces/transaction-interface';
import { DashboardService } from '../../../services/dashboard.service';
import { CHAT_COLORS } from '../../../../../core/constants/chat-colors';

@Component({
  selector: 'app-subcategories-chart',
  standalone: false,
  templateUrl: './subcategories-chart.component.html',
  styleUrl: './subcategories-chart.component.scss'
})
export class SubcategoriesChartComponent implements OnChanges {
  @Input()
  public data: ExpenseInterface[] = [];

  @Input()
  public totalAmount: number = 0;

  public single: { name: string; value: number }[] = [];

  public colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: CHAT_COLORS,
  };

  constructor(private dashboardService: DashboardService) {}

  public ngOnChanges(): void {
    if (this.data?.length) {
      this.modifyData();
    }
  }

  public formatTooltip = (val: any): string => {
    const percent = ((val.value / this.totalAmount) * 100).toFixed(1);

    return `${val.data.name}: ${val.value} ${this.dashboardService.filtersValue.mainCurrency}(${percent}%)`;
  };

  public modifyData(): void {
    const data: Record<string, number> = this.data.reduce((acc: Record<string, number>, item) => {
      const subcategoryName: string = item.subcategoryName;

      const amount: number = item.amounts[this.dashboardService.filtersValue.mainCurrency];

      acc[subcategoryName] = (acc[subcategoryName] || 0) + amount;

      return acc;
    }, {} as Record<string, number>);

    this.single = Object.entries(data).map(
      ([name, value]) => ({ name, value })
    );
  }
}
