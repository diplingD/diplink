import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    $('.selectpicker').selectpicker();
    console.log($('.selectpicker').length);


    const registrationData = this.service.getRegistrationData();
    this.name = registrationData.name;
    this.email = registrationData.email;
    this.username = registrationData.username;
    this.password = registrationData.password;
  }

  // Fields
  name: string;
  email: string;
  username: string;
  password: string;
  
  skills1: string[] = [];
  skills2: string[] = [];
  skills3: string[] = [];

  skills: string[] = [];

  nextReg() {
    this.skills = this.skills1.concat(this.skills2, this.skills3);
    this.service.setSkills(this.skills);

    this.router.navigate(['register2']);
  }

}
