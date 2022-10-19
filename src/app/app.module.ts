import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './inc/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './inc/navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { TlPipePipe } from './pipes/tl-pipe.pipe';
import { PricePipe } from './pipes/price.pipe';
import { BasketComponent } from './basket/basket.component';
import { TitleH1Directive } from './directives/title-h1.directive';
import { UsersModule } from './users/users.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    NavbarComponent,
    ProfileComponent,
    AddressComponent,
    TlPipePipe,
    PricePipe,
    BasketComponent,
    TitleH1Directive
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    NgxSmartModalModule.forRoot(),
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
