import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/Model/object-model';
import { CustomerService } from '../../../app/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-dashboard',
  imports: [CommonModule],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit {

  all_products: Product[] = [];
  show_Checkout: boolean = false;

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.customerService.allProduct().subscribe(data => {
      this.all_products = data as Product[]
    }
    )
  }

  buyProduct(id: string) {
    this.show_Checkout = true;
    this.customerService.quickBuyProduct(id);
    this.router.navigateByUrl('/checkout');
  }

  addToCart() {
    alert("This is showcase")
  }


}
