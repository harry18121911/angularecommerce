import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})
export class SigninSignupComponent {
  userForm = new FormGroup({
    name: new FormControl(""),
    password: new FormControl(""),
    email: new FormControl(""),
  })

  regForm: boolean = false;
  signInForm: FormGroup = this.userForm;
  signUpForm: FormGroup = this.userForm;
  signUpSubmitted: boolean = false;
  href: string = "";
  user_data: User = new User;
  user_dto: User = new User;
  user_reg_data: User = new User;
  signInFormValue: User = new User;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginSignupService) {

  }

  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href == "/sign-up") {
      this.regForm = true;
    } else if (this.href == "/sign-in") {
      this.regForm = false;
    }

    this.signUpForm = this.formBuilder.group({
      name: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", Validators.required],
    })
  }

  get rf() {
    return this.signUpForm.controls;
  }

  onSubmitSignUp() {
    alert("Test")
    this.signUpSubmitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.user_reg_data = this.signUpForm.value;
    this.user_dto = {
      id:this.user_reg_data.id,
      aboutYou: this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dateOfBirth: this.user_reg_data.dateOfBirth,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: this.user_reg_data.address,
      language: this.user_reg_data.language,
      number: this.user_reg_data.number,
      name: this.user_reg_data.name,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role,
      password: this.user_reg_data.password
    };
    this.loginService.userRegister(this.user_dto).subscribe(data => {
      alert("User Registered Successfull");
      this.router.navigateByUrl("/sign-in");
    })
  }

  onSubmitSignIn() {
    alert("signin")
    this.loginService.authLogin(
      {
        name: this.signInFormValue.name,
        email: this.signInFormValue.email,
        password: this.signInFormValue.password
      }).subscribe((data) => {
        let datas= data as User[]
        console.log(datas)
      this.user_data=datas[0] as User ;
      console.log(this.user_data)
        if(this.user_data){
          if(this.user_data.role =="seller"){
            sessionStorage.setItem("user_session_id", this.user_data.id);
            sessionStorage.setItem("role", this.user_data.role);
            this.router.navigateByUrl("/seller-dashboard");
          }else if(this.user_data.role=="buyer"){
            sessionStorage.setItem("user_session_id", this.user_data.id);
            sessionStorage.setItem("role", this.user_data.role);
            this.router.navigateByUrl("/buyer-dashboard");
          }else{
            alert("Invalid login details");
          }
          console.log(this.user_data)
        }
      })
  }
}
