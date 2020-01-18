import { RouterModule, Routes, Router } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { OthersComponent } from './others/others.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

export const routes:Routes = [
  { path: '', component:LoginComponent},
  { path: 'home', component:HomeComponent},
  { path: 'home', component:HomeComponent, outlet:'outlet1'},
  { path: 'others', component:OthersComponent},
  { path: 'others', component:OthersComponent, outlet:'outlet1'},
  { path: 'search', component: SearchComponent},
  { path: 'search', component: SearchComponent, outlet:'outlet1'},
  { path: 'details/:id', component: DetailsComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes)],
    exports: [RouterModule]
    
})
export class RoutingModule{

}