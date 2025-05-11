import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-auth',
  standalone: false,
  template: `<router-outlet></router-outlet>`,
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  constructor(
  ) {}

  public ngOnInit(): void {

  }
}
