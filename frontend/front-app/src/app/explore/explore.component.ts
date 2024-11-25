import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements AfterViewInit, OnInit{
  constructor(private router: ActivatedRoute, private service: UserService, private myRouter: Router) { }

  ngOnInit(){
    this.username = this.router.snapshot.paramMap.get('username')!;

    this.getAllUsers();    
  }

  // ako ga uradim u ngOnInit uradi ga prebrzo pa onda ne stignu da se ispisu vrednosti u onom multichecku, pa bolje ovako
  ngAfterViewInit(){
    
  }

  // Fields:
  username: string;
  message: string;
  allUsers: User[] = [];

  getAllUsers(){
    this.service.getAllUsers(this.username).subscribe((usersFromDB: User[])=>{
      if(usersFromDB!=null){
        this.allUsers = usersFromDB;

        this.filteredUsers = this.allUsers;
        console.log(this.allUsers);
      }
      else{
        this.message="Neuspeh!"
      }
    });
  }
  
  navigateToProfile(userUsername){
    console.log(userUsername);
    this.myRouter.navigate([`userprofile/${userUsername}/${this.username}`]);
  }

  // FILTRIRANJE
  filteredUsers = this.allUsers;
  selectedSkills: string[] = [];

  onSkillChange(skill: string, event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.selectedSkills.push(skill);
    } else {
      this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    }
    this.filterUsers();
  }

  filterUsers() {
    if (this.selectedSkills.length === 0) {
      this.filteredUsers = this.allUsers;
    } else {
      this.filteredUsers = this.allUsers.filter(user => 
        this.selectedSkills.every(skill => user.skills.includes(skill))
      );
    }
  }

  // SEARCHING
  searchParam: string;

  searchUsers() {
    // Filter the users based on the search parameter
    this.filteredUsers = this.allUsers.filter(user => 
      user.firstname.toLowerCase().includes(this.searchParam.toLowerCase())
    );
  }
}
