import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faBars, faBriefcase, faUsers, faRightFromBracket, faHandPointRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faUser = faUser;
  faUsers = faUsers;
  faBars = faBars;
  faBriefcase = faBriefcase;
  faRightFromBracket = faRightFromBracket;
  faHandPointRight=faHandPointRight


  constructor( private router:Router ) { }

  ngOnInit(): void {
  }

  // logOut
  fncLogOut() {
    const answer = confirm("Are you sure!")
    if ( answer ) {
      localStorage.removeItem('user') // beni hatırlayı sil
      sessionStorage.removeItem('user') // user oturumunu sil
      this.router.navigate(['/']) // login sayfasına yönel
    }
  }

}
