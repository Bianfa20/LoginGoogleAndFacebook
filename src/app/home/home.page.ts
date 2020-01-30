import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  picture;
  name;
  email;

  constructor() {}

  loginGoogle() {
    console.log('Login con google') ;
  }

  loginFacebook() {
    console.log('Login con Facebook');
  }

}
