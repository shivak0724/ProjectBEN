import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SearchEmployerComponent } from './components/search-employer/search-employer.component';
import { AddNewEmployerComponent } from './components/add-new-employer/add-new-employer.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ViewEmployerProfileComponent } from './components/view-employer-profile/view-employer-profile.component';


const routes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'search-employer',
      component: SearchEmployerComponent
    },
    {
      path: 'add-employer',
      component: AddNewEmployerComponent
    },
    {
      path: 'search-result',
      component: SearchResultComponent
      
    },
    {
      path: 'view-employer',
      component: ViewEmployerProfileComponent
    },
    
  ];
  
  @NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}
  