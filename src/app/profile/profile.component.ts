import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bilgiler, IUser } from '../models/iuser';
import { SeoService } from '../services/seo.service';
import { decrypt } from '../util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:Bilgiler = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: ''
  }
  password = ''

  constructor( 
    private toast:ToastrService, 
    private http: HttpClient,
    private seo: SeoService
    ) {

    const stUser = sessionStorage.getItem('user');
    if ( stUser ) {
      try {
        this.user = JSON.parse( decrypt(stUser) );
      } catch (error) {
        sessionStorage.removeItem('user')
      }
    }

   }

  ngOnInit(): void {
    this.seo.updateTile("Profile")
  }


  fncUpdate() {
    
    if ( this.user.userName === "" ) {
        this.toast.error("Name Empty!")
    }else if ( this.user.userSurname === "" ) {
      this.toast.error("Surname Empty!")
    }else if ( this.user.userEmail === "" ) {
      this.toast.error("Email Empty!")
    }else if ( this.user.userPhone === "" ) {
      this.toast.error("Phone Empty!")
    }else if ( this.password === "" ) {
      this.toast.error("Password Empty!")
    }else {
      
      // datalar var ve servise gönderimi sağla
      const url = 'https://www.jsonbulut.com/json/userSettings.php'
      const sendParams = {
        ref: '74430d47fa16b4c53c0fe59510752c70',
        userName: this.user.userName,
        userSurname: this.user.userSurname,
        userMail: this.user.userEmail,
        userPhone: this.user.userPhone,
        userPass: this.password,
        userId: this.user.userId
      }

      const newThis = this
      this.http.get<IUser>(url, {params: sendParams}).subscribe({
        next(res) {
          const u = res.user[0]
          const durum = u.durum
          const mesaj = u.mesaj
          if ( durum === true ) {
            const stUser = JSON.stringify( newThis.user )
            sessionStorage.setItem('user', stUser)
            newThis.toast.success(mesaj)
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          }else {
            newThis.toast.error(mesaj)
          }
        },
        error(er) {
          console.error( er.message )
        }       
      })

    }

  }

}
