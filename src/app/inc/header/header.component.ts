import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Bilgiler } from 'src/app/models/iuser';
import { decrypt, rememberControl } from 'src/app/util';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;
  faXmark = faXmark;
  user:Bilgiler = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: ''
  }
  constructor( private router:Router ) { 
    rememberControl();
    const stUser = sessionStorage.getItem('user');
    if ( stUser ) {
      // giriş var
      try {
        // hata olma olasılığı olan kodlar bu bölüme yazılır.
        this.user = JSON.parse( decrypt(stUser) );
      } catch (error) {
        // hata olduğunda çalışacak kodlar.
        sessionStorage.removeItem('user')
        localStorage.removeItem('user')
        this.router.navigate(['/'])
      }
    }else {
      // giriş yok
      sessionStorage.removeItem('user')
      localStorage.removeItem('user')
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
  }

}
