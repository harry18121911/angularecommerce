import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order, Product } from '../../core/Model/object-model';
import { ApiService } from '../../core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private single_product_id = new BehaviorSubject("");
  currentProduct = this.single_product_id.asObservable();
  public user_url = "http://localhost:3000/user/";
  public product_url = "http://localhost:3000/products/";
  public order_url = "http://localhost:3000/orders";

  constructor(private apiService:ApiService) { }

  allProduct():Observable<Object>{
    return this.apiService.get(this.product_url);
  }

  quickBuyProduct(product_id:string){
    this.single_product_id.next(product_id)
  }

  individualProduct(id:string){
    return this.apiService.get(this.product_url + id);
  }

  userDetail(id: string){
    return this.apiService.get(this.user_url + id);
  }

  insertNewOrder(order_dto:Order):Observable<Object>{
    return this.apiService.post(this.order_url,order_dto);
  }

  orderDashboardData():Observable<Object>{
    return this.apiService.get(this.order_url);
  }

  productDashboard():Observable<Object>{
    return this.apiService.get(this.product_url);
  }

}
