import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { RegData } from '../models/regdata';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private service: UserService) { }

  ngAfterViewInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton?.addEventListener('click', () => {
        container?.classList.add("right-panel-active");
    });

    signInButton?.addEventListener('click', () => {
        container?.classList.remove("right-panel-active");
    });
  }

  // Fields:
  emailLogin: string;
  passwordLogin: string;
  message: string;
  //registration
  nameReg: string;
  emailReg: string;
  usernameReg: string;
  passwordReg: string;
  regdata: RegData;

  navigateToRegistration(){  
    const data = {
      name: this.nameReg,
      email: this.emailReg,
      username: this.usernameReg,
      password: this.passwordReg
    }

    this.service.setRegistrationData(data);     // Store data in the service

    this.router.navigate(['register']);
  }

  login(){
    this.service.login(this.emailLogin, this.passwordLogin).subscribe((userFromDB: User)=>{
      if(userFromDB!=null){
        this.router.navigate(['explore', userFromDB.username]);
      }
      else{
        this.message="Uneli ste pogresan email i/ili lozinku!"
      }
    });
  }

}
