import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { User } from '../../core/Model/object-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user_url = "http://localhost:3000/user/";

  constructor(private http:HttpClient, private apiService:ApiService) { }

  //get individual data
  getUserData(user_id:string){
    return this.apiService.get(this.user_url + user_id);
  }

  //update data by user_id
  updateUserData(user_id:string,user_dto:User):Observable<Object>{
    return this.apiService.put(this.user_url+user_id,user_dto);
  }

}
