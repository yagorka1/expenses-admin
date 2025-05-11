import { Component, Input, OnInit } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  ],
  styleUrl: './table.component.scss'
})
export class TableComponent  implements OnInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() public columnHeaders: { [key: string]: string };

  constructor() {}

  ngOnInit(): void {
    console.log(this.dataSource)
  }
}
