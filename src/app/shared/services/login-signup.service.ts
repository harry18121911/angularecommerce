import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

type User={
  user_name:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public login_url="http://localhost:3000"
  public register_url="http://localhost:3000"

  constructor(private http:HttpClient, private api:ApiService) { }

  authLogin({user_name,password}:User):Observable<Object>{
    return this.api.get(this.login_url + "/user?email="+user_name+"&password="+password);
  }

  userRegister(user_dto:User):Observable<Object>{
    return this.api.post(this.register_url+"/user",+user_dto
    )
  }

  adminLogin({user_name,password}:User):Observable<Object>{
    return this.api.get(this.login_url+"/user?email="+user_name+"&password="+password+"&role=admin");
  }
}
