import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { User } from '../../core/Model/object-model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public user_url = "http://localhost:3000/user/";
  public product_url = "http://localhost:3000/products";
  public orders_url = "http://localhost:3000/orders";
  public all_user= "http://localhost:3000/user";

  constructor(private apiService:ApiService) { }

  userDashboardData(){
    return this.apiService.get(this.user_url);
  }

  productDashboardData(){
    return this.apiService.get(this.product_url);
  }

  allUser(){
    return this.apiService.get(this.all_user);
  }

  addUser(user_dto:User){
    return this.apiService.post(this.user_url,user_dto)
  }

  singleUser(user_id: string){
    let concat=this.user_url+user_id;
    return this.apiService.get(concat)
  }

  editUser(user_id:string, user_dto:User){
    return this.apiService.put(this.user_url + user_id, user_dto)
  }

  deleteUser(user_id:string){
    return this.apiService.delete(this.user_url + user_id)
  }

}
