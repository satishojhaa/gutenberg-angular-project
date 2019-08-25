import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookCategoriesComponent } from './book-categories/book-categories.component';
import { BookListComponent } from './book-list/book-list.component';


const routes: Routes = [
  {path:'', redirectTo:'books', pathMatch:'full'},
  {path:'books', children:[
    {path:'',component:BookCategoriesComponent},
    {path:':category',component:BookListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
