import { Component } from '@angular/core';
// import { LoginHeaderComponent } from '../../managers/login-header/login-header.component';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

constructor(private session:LoginService) {}

logout(){
  
  this.session.logout();
  alert('logged-out');
  return "logged-out"


}

}
