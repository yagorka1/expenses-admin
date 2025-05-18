import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../components/input/input.module';
import { ButtonModule } from '../../components/button/button.module';
import { TableComponent } from '../../components/table/table.component';
import { MaterialModule } from '../../core/modules/material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardFiltersComponent } from './components/dashboard-filters/dashboard-filters.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PersonsChartComponent } from './components/charts/persons-chart/persons-chart.component';
import { CategoriesChartComponent } from './components/charts/categories-chart/categories-chart.component';
import { SubcategoriesChartComponent } from './components/charts/subcategories-chart/subcategories-chart.component';
import {
  CategoriesSubcategoriesChartComponent
} from './components/charts/categories-subcategories-chart/categories-subcategories-chart.component';
import {
  ExpensesByMonthChartComponent
} from './components/charts/expenses-by-month-chart/expenses-by-month-chart.component';

@NgModule({
  declarations: [DashboardComponent, DashboardFiltersComponent, PersonsChartComponent,
    CategoriesChartComponent, SubcategoriesChartComponent, CategoriesSubcategoriesChartComponent,
    ExpensesByMonthChartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
    TableComponent,
    FormsModule,
    MaterialModule,
    NgxChartsModule,
  ],
  exports: [],
  providers: [DatePipe],
})
export class DashboardModule {
}
