import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  icon: string = "assets/icon.png";
  bgImage: string = "assets/cognizant3.jpg";
  showImg: boolean = true;

  constructor(public authService: AuthService) { }

  hideImage(){
    this.showImg = !this.showImg;
  }
}
