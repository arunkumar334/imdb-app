import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { OthersComponent } from './others/others.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailsComponent,
    HomeComponent,
    OthersComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
