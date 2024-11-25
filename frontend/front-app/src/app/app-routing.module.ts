import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ExploreComponent } from './explore/explore.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { Register2Component } from './register2/register2.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "register2", component: Register2Component},
  {path: "explore/:username", component: ExploreComponent},    // kad se navigiram na explore saljem i username
  {path: "myprofile/:username", component: MyprofileComponent},
  {path: "userprofile/:userUsername/:myUsername", component: UserprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
