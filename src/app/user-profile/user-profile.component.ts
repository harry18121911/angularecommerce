import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../core/Model/object-model';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { toggleVisibilityService } from '../service/toggle-visibility.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup = new FormGroup({});
  userProfile: boolean = false;
  user_data: User = new User;
  addEditUserForm: FormGroup = new FormGroup({
    id: new FormControl(""),
    name: new FormControl(""),
    password: new FormControl(""),
    email: new FormControl(""),
    uploadPhoto: new FormControl(""),
    role: new FormControl(""),
    number: new FormControl(0),
    address: new FormControl(""),
    gender: new FormControl(""),
    language: new FormControl(""),
    dateOfBirth: new FormControl(""),
    agreetc: new FormControl(false),
    age: new FormControl(0),
    aboutYou: new FormControl(""),
  });
  user_dto: User = new User;
  user_update_data: User = new User;
  user_profile_pic: string = "";
  user_language: string = "";
  user_role: "admin" | "buyer" | "seller" | string = "";
  addEditUser: boolean = false;
  add_user: boolean = false;
  edit_user: boolean = false;
  popup_header: string = "";
  signInFormValue: User = new User;
  user_id: string | null = "";

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private toggleVisibilityService: toggleVisibilityService) { }

  ngOnInit(): void {
    this.user_id = sessionStorage.getItem("user_session_id");
    this.userProfileForm = this.formBuilder.group({

    })

  }

  get rf() {
    return this.userProfileForm.controls
  }

  editUserData(user_id: string) {
    this.userService.getUserData(user_id).subscribe(data => {
      this.user_data = data as User;
      this.user_profile_pic = this.user_data.uploadPhoto;
      this.user_language = this.user_data.language;
      this.user_role = this.user_data.role;
      this.userProfileForm.setValue({
        id: user_id,
        name: this.user_data.name,
        age: this.user_data.age,
        email: this.user_data.email,
        dateOfBirth: this.user_data.dateOfBirth,
        password: this.user_data.password,
        gender: this.user_data.gender,
        uploadPhoto: this.user_profile_pic,
        address: this.user_data.address,
        aboutYou: this.user_data.aboutYou,
        number: this.user_data.number,
        language: this.user_data.language,
        agreetc: this.user_data.agreetc,
        role: this.user_data.role,
      })
    })
  }

  updateProfile() {
    this.userProfile = true;
    if (this.userProfileForm.invalid) {
      return;
    }
    this.user_update_data = this.userProfileForm.value;
    this.user_dto = {
      id: this.user_update_data.id,
      name: this.user_update_data.name,
      age: this.user_update_data.age,
      email: this.user_update_data.email,
      dateOfBirth: this.user_update_data.dateOfBirth,
      password: this.user_update_data.password,
      gender: this.user_update_data.gender,
      uploadPhoto: this.user_update_data.uploadPhoto,
      address: this.user_update_data.address,
      aboutYou: this.user_update_data.aboutYou,
      number: this.user_update_data.number,
      language: this.user_update_data.language,
      agreetc: this.user_update_data.agreetc,
      role: this.user_update_data.role,
    }
    if (this.user_id) {
      this.userService.updateUserData(this.user_id, this.user_dto).subscribe(data => {
        alert("Profile updated successfully");
        if (this.user_role == "admin") {
          this.router.navigateByUrl("/admin-dashboard");
        } else if (this.user_role == "seller") {
          this.router.navigateByUrl("/seller-dashboard");
        } else if (this.user_role == "buyer") {
          this.router.navigateByUrl("/buyer-dashboard");
        }
      }
      )
    }
  }

  isVisible$ = false;
  toggleVisibility() {
    console.log(this.isVisible$)
    this.isVisible$ = this.toggleVisibilityService.toggleVisibility(this.isVisible$);
    console.log(this.isVisible$)
  }

}
