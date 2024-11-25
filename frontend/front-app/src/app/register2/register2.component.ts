import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
declare var $: any;

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrl: './register2.component.css'
})
export class Register2Component implements OnInit {

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    $('.selectpicker').selectpicker();
    console.log($('.selectpicker').length);


    const registrationData = this.service.getRegistrationData();
    this.name = registrationData.name;
    this.email = registrationData.email;
    this.username = registrationData.username;
    this.password = registrationData.password;
    console.log(this.password);
    this.skills = this.service.getSkills();
  }

  // Fields
  name: string;
  email: string;
  username: string;
  password: string;
  bio: string;
  videoURL: string;
  igURL: string;
  ytURL: string;
  spotifyURL: string;

  skills: string[] = [];

  city: string;
  country: string;

  message: string;
  registerUser() {
    this.service.register(this.name, this.username, this.email, this.password, this.skills, this.bio, this.uploadedImage, this.videoURL, this.igURL, this.ytURL, this.spotifyURL, this.city, this.country).subscribe( respObj => {
      if(respObj['message'] == 'ok'){
        this.message = "User added!";
      } else {
        this.message = "Error!"
      }
    });
  }

  // Za upload slike:
  selectedImage: File;
  uploadedImage: string;
  
  onFileSelected(event: any) {    // poziva se kad korisnik izabere sliku za upload. Ovom metodom izvlacimo izabrani fajl iz dogadjaja i cuvamo ga u 'image' promenljivu
    this.selectedImage = event.target.files[0];
  }

  uploadImage(event: any) {
    event.preventDefault();
    if (!this.selectedImage) {
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageBase64 = e.target.result as string; // base64-encoded image data

      const image = new Image();
      image.onload = () => {
          const width = image.width;
          const height = image.height;

          if (width < 100 || height < 100 || width > 300 || height > 300) {
            alert("Slika mora imati minimalno dimenzije 100x100px i maksimalno dimenzije 300x300px.");
            return;
          }
          
          this.uploadedImage = imageBase64;
      };

      image.src = imageBase64;
    };

    reader.readAsDataURL(this.selectedImage);
  }
  
}
