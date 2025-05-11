import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { InputModule } from '../../components/input/input.module';
import { ButtonModule } from '../../components/button/button.module';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TableComponent } from '../../components/table/table.component';
import { MaterialModule } from '../../core/modules/material/material.module';

@NgModule({
  declarations: [TransactionsComponent, TransactionsListComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
    TableComponent,
    FormsModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [],
  providers: [DatePipe],
})
export class TransactionsModule {}
