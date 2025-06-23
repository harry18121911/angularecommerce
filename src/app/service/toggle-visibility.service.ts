import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class toggleVisibilityService{

  // A BehaviorSubject to hold and emit the visibility state
  private isVisibleSubject = new BehaviorSubject<boolean>(false);

  // Observable for components to subscribe to
  isVisible$ = this.isVisibleSubject.asObservable();

  constructor() { }

  // Toggle visibility
  toggleVisibility(): void {
    const current = this.isVisibleSubject.getValue();
    console.log("This is current value : " + current)
    this.isVisibleSubject.next(!current);
    console.log("This is current value : " + current)
  }

  // Optionally expose explicit show/hide methods
  show(): void {
    this.isVisibleSubject.next(true);
  }

  hide(): void {
    this.isVisibleSubject.next(false);
  }
}
