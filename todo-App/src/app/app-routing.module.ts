import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TodoHomeComponent } from './components/todo-home/todo-home.component';

const routes: Routes = [
{
  path:'todoHome',component:TodoHomeComponent
},
{
  path:'register',component:RegisterComponent
},
{
  path:'',component:LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
