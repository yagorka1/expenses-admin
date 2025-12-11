import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../../../../core/services/auth.service';
import { SignInDataInterface } from '../../../../core/interfaces/auth-data.interface';

@UntilDestroy()
@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  public form: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public submit(): void {
    if (this.form.valid) {
      this.authService.signIn(this.form.value as SignInDataInterface).pipe(untilDestroyed(this)).subscribe();
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      password: new FormControl<string | null>(null, [Validators.required]),
    });
  }
}
