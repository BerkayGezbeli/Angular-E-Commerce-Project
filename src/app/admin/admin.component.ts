import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct, ProBilgiler } from '../models/iproduct';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { fncUser } from '../util';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from '../services/seo.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  search = ''
  arr:ProBilgiler[] = []
  oldArr:ProBilgiler[] = []
  item:ProBilgiler = {}
  constructor( 
    private http:HttpClient,
    public ngxSmartModalService: NgxSmartModalService,
    private toastr:ToastrService,
    private seo:SeoService,
    private rest:RestService
  ) {}

  ngOnInit(): void {
    this.seo.updateTile("Admin")
    const newThis = this
    this.rest.allProduct().subscribe({
      next(res) {
        const bilgiler = res.Products[0].bilgiler;
        if ( bilgiler ) {
          newThis.arr = bilgiler
          newThis.oldArr = bilgiler
        }
      },
      error(err) {
        console.error( err.message )
      }
    })

  }

  fncSearch() {
    
    this.arr = this.oldArr
    const s = this.search.toLocaleLowerCase()

    const filterGlobal = (item:ProBilgiler) => item.productName?.toLocaleLowerCase().includes(s) ||
    item.price?.toLocaleLowerCase().includes(s) || item.productId?.includes(s)

    this.arr = this.arr.filter( filterGlobal );

  }

  funcDetail( i:number ) {
    this.item = this.arr[i]
  }

  fncAddBasket( pid:string ) {
    const user = fncUser();
    if ( user !== null ) {

      const url = 'https://jsonbulut.com/json/orderForm.php';
      const sendParams =  {
        ref: '74430d47fa16b4c53c0fe59510752c70',
        customerId: user.userId,
        productId: pid,
        html: pid
      }
      const newThis = this
      this.http.get<any>( url, { params: sendParams } ).subscribe({
        next(res) {
          const status:boolean = res.order[0].durum
          const message:string = res.order[0].mesaj
          if ( status === true ) {
              newThis.toastr.success(message)
              newThis.ngxSmartModalService.getModal('myModal').close();
          }
        },
        error(err) {
          console.error( err.message )
        }
      })
      
    }
    
  }

}
