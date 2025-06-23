import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  signInFormValue:User =new User;
  user_data:User=new User;

  constructor(private router:Router,private loginService:LoginSignupService){}

  ngOnInit():void{

  }

  onSubmitSignIn(){
    this.loginService.adminLogin({name: this.signInFormValue.name,email:this.signInFormValue.email,password:this.signInFormValue.password}).subscribe(data=>{
      let datas=data as User[];
      this.user_data=datas[0] as User;
      if(this.user_data){
        sessionStorage.setItem("user_session_id",this.user_data.id)
        sessionStorage.setItem("role",this.user_data.role)
        this.router.navigateByUrl("/admin-dashboard")
      }else{
        alert("Invalid response")
      }

      console.log(this.user_data);
    },error=>{
        console.log("This is error ", error)
      })
  }
}
