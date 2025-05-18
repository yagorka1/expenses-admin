import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashboardFiltersInterface } from '../interfaces/dashboard-filters.interface';
import { CURRENCIES } from '../../../core/constants/currencies';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private filters: BehaviorSubject<DashboardFiltersInterface> = new BehaviorSubject({ mainCurrency: CURRENCIES.EUR });

  public set filtersValue(value: DashboardFiltersInterface) {
    this.filters.next(value);
  }

  public get filtersValue$(): Observable<DashboardFiltersInterface> {
    return this.filters.asObservable();
  }

  public get filtersValue(): DashboardFiltersInterface {
    return this.filters.getValue();
  }
}
