import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutersModule } from './routers/app-routers.module';
import { EndpointInterceptor } from './core/interceptors/endpoint.interceptor';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    AppRoutersModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EndpointInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
