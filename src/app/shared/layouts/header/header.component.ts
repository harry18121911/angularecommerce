import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public alterDisplay() {
    let element = document.getElementById("productBar");
    if (element) {
        element.classList.toggle("hidden");
    }


  }

  public test() {
    alert("Test");
  }

}

// el.className = el.className === "active" ? "inactive" : "active";
