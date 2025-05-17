import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  imports: [
    MatHeaderRowDef,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    NgForOf,
    MatHeaderRow,
    MatRow,
    MatCell,
    MatHeaderCell,
    RouterLink,
    NgIf,
    DatePipe,
    MatIcon,
  ],
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Output()
  public sort: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public openDetails: EventEmitter<any> = new EventEmitter<any>();

  @Input() displayedColumns: string[] = [];

  @Input() dataSource: any[] = [];

  @Input() public columnHeaders: { [key: string]: { name: string, isSortable: boolean }};
}
