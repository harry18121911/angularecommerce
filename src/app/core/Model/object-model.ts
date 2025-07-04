import { HttpParams } from "@angular/common/http";

export class User {
  id:string="";
  name: string = "";
  number: number= 0;
  uploadPhoto: string = "";
  role: string = "";
  password:string="";
  address: string = "";
  gender: string = "";
  language: string = "";
  email: string = "";
  dateOfBirth: string = "";
  agreetc: boolean = true;
  age: number = 18;
  aboutYou: string = "";
}

export class Address {
  id: number = 0;
  addLine: string = "";
  addLine2: string = "";
  city: string = "";
  state: string = "";
  zipCode: number = 0;
}

export class Product {
  id: string= "";
  name: string = "";
  uploadPhoto: string = "";
  uploadDescription: string = "";
  mrp: number = 0;
  dp: number = 0;
  status: boolean = true;
}

export class Order {
  id: string= "";
  userId: string= "";
  sellerId: string= "";
  product: Product = {
    id: "",
    name: "",
    uploadPhoto: "",
    uploadDescription: "",
    mrp: 0,
    dp: 0,
    status: true,
  }
  deliveryAddress:string="";
  contact:number=0;
  dateTime:string="";

};

