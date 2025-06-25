import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class toggleVisibilityService{

  constructor() { }

  // Toggle visibility
  toggleVisibility(element:boolean) {
   return !element;
  }

}
