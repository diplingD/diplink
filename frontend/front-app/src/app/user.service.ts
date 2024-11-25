import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(mailFromForm, passwordFromForm){
    const data = {
      mail: mailFromForm,
      password: passwordFromForm
    }

    return this.http.post('http://localhost:4000/users/login', data);
  }

  findUser(usernameFromForm){
    const data = {
      username: usernameFromForm
    }

    return this.http.post('http://localhost:4000/users/findUser', data);
  }

  getAllUsers(usernameFromForm){
    console.log(usernameFromForm);
    const data = {
      username: usernameFromForm
    }
    
    return this.http.post('http://localhost:4000/users/getAllUsers', data);
  }

  register(firstnameForm, usernameForm, mailForm, passwordForm, skillsForm, bioForm, pictureURLForm, videoURLForm, igURLForm, ytURLForm, spotifyURLForm, cityForm, countryForm){
    const data = {
      firstname: firstnameForm,
      username: usernameForm,
      mail: mailForm,
      password: passwordForm,
      skills: skillsForm,
      bio: bioForm,
      pictureURL: pictureURLForm,
      videoURL: videoURLForm,
      igURL: igURLForm,
      ytURL: ytURLForm,
      spotifyURL: spotifyURLForm,
      city: cityForm,
      country: countryForm
    }

    return this.http.post('http://localhost:4000/users/register', data);
  }

  // DODAVANJE KOMENTARA
  addComment(usernameForm, authorForm, commentTextForm){
    const data = {
      username: usernameForm,
      author: authorForm,
      commentText: commentTextForm
    }

    return this.http.post('http://localhost:4000/users/addComment', data);
  }



  // Ovo mi sluzi za zajednicke podatke izmedju login i register komponente:
  private registrationData: any;
  setRegistrationData(data: any) {
    this.registrationData = data;
  }
  getRegistrationData() {
    return this.registrationData;
  }

  private skills: string[];
  setSkills(skills: string[]){
    this.skills = skills;
  }
  getSkills(){
    return this.skills;
  }



}
