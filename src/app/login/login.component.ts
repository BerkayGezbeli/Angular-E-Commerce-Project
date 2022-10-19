import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '../models/iuser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { encrypt, rememberControl } from '../util';
import { SeoService } from '../services/seo.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( 
    private fb:FormBuilder, 
    private http:HttpClient, 
    private toastr: ToastrService,
    private router: Router,
    private seo: SeoService
  ) {
      // kullanıcı daha önce beni hatırla demiş ise
      // kullanıcıyı direct olarak admine gönder
      const status = rememberControl();
      if ( status === true ) {
        this.router.navigate(['/admin'])
      }
   }

  userForm = this.fb.group({
    email: '',
    password: '',
    remember: false
  })

  ngOnInit(): void {

    this.seo.updateTile("Admin Login")
    this.seo.updateMeta("content", "Admin Login Page")

    this.userForm = new FormGroup({
      email: new FormControl( this.userForm.value.email, [
        Validators.required, Validators.email
      ]),
      password: new FormControl( this.userForm.value.password, [
          Validators.required
      ]),
      remember: new FormControl( this.userForm.value.remember, [] )
    })

  }

  // get Methods
  get email() {
    return this.userForm.get('email')
  }
  get password() {
    return this.userForm.get('password')
  }

  fncLogin() {
    const email = this.email?.value
    const password = this.password?.value
    const remember = this.userForm.value.remember;
    
    
    const url = 'https://www.jsonbulut.com/json/userLogin.php'
    const sendParams = {
      ref: '74430d47fa16b4c53c0fe59510752c70',
      userEmail: email,
      userPass: password,
      face: 'no'
    }

    // send data
    const newThis = this
    this.http.get<IUser>(url, { params: sendParams }).subscribe({
      next(res) {
        const user = res.user[0]
        const durum = user.durum
        const mesaj = user.mesaj
        if ( durum === true ) {
            // Giriş başarılı
            // sessionStorge'a kullanıcı bilgilerini sakla
            const us = user.bilgiler;
            if ( us ) {
              const stUs = JSON.stringify(us);
              sessionStorage.setItem('user', encrypt(stUs) );
              // remember -> true
              if ( remember === true ) {
                localStorage.setItem( 'user', encrypt(stUs) )
              }
              newThis.router.navigate(['/admin'])
            }
        }else {
          // Giriş başarısız
          newThis.toastr.clear() // dismiss
          newThis.toastr.error(mesaj, "Hata");
        }
      },
      error( err ) {
        console.error( err.message )
      }
    })

  }

}
