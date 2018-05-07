import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { TextMaskModule } from 'angular2-text-mask';



import {NgxPaginationModule} from 'ngx-pagination';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchEmployerComponent } from './components/search-employer/search-employer.component';
import { AddNewEmployerComponent } from './components/add-new-employer/add-new-employer.component';
import { ConflictModalComponent } from './components/conflict-modal/conflict-modal.component';
import { AlertComponent } from './components/alert/alert.component';
import { ViewEmployerProfileComponent } from './components/view-employer-profile/view-employer-profile.component';
import { HomeComponent } from './components/home/home.component';

/*Models */
import { Address } from '../app/models/address.model';
import { Contact } from '../app/models/contact.model';
import { Employer } from '../app/models/employer.model';



/* Services */
import { AlertService } from '../app/services/alert.service';
import { HttpService } from '../app/services/http.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'selenium-webdriver';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultComponent,
    SearchEmployerComponent,    
    ConflictModalComponent,
    AlertComponent,    
    HomeComponent,
    AddNewEmployerComponent,
    ViewEmployerProfileComponent
  ],
  imports: [
    BrowserModule,
    TextMaskModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,NgbModule.forRoot()
  ],
  providers: [Employer,Contact,AlertService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
