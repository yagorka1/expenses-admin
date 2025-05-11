import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { InputModule } from '../../components/input/input.module';
import { ButtonModule } from '../../components/button/button.module';

@NgModule({
  declarations: [AuthComponent, SignInComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
  ],
  exports: [],
  providers: [],
})
export class AuthModule {}
