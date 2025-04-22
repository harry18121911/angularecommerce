import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

type User={
  name:string,
  email:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public login_url="http://localhost:3000"
  public register_url="http://localhost:3000"

  constructor(private http:HttpClient, private api:ApiService) { }

  authLogin({email,password}:User):Observable<Object>{
    return this.api.get(this.login_url + "/user?email="+email+"&password="+password);
  }

  userRegister(user_dto:User):Observable<Object>{
    return this.api.post(this.register_url+"/user",+user_dto
    )
  }

  adminLogin({email,password}:User):Observable<Object>{
    return this.api.get(this.login_url+"/user?email="+email+"&password="+password+"&role=admin");
  }
}
