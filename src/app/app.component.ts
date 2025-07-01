import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from "./shared/layouts/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  screenHeight:number=0;
  screenWidth:number=0;
  footerMaxHeight:number=0;
  title = 'angularecommerce';

  constructor(){
    this.getScreenSize();
  }

  @HostListener("window:resize", [])

  getScreenSize():void{
    this.screenHeight= window.innerHeight;
    this.screenWidth= window.innerWidth;
    console.log(this.screenHeight,this.screenWidth);
  }
}
