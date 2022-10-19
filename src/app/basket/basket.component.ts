import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IOrder, OrderList } from '../models/iorder';
import { SeoService } from '../services/seo.service';
import { fncUser } from '../util';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket:OrderList[] = []
  constructor( private http:HttpClient, private seo:SeoService ) { }

  ngOnInit(): void {
    this.seo.updateTile("Order")
      const user = fncUser();
      if ( user != null ) {
        const url = 'https://www.jsonbulut.com/json/orderList.php';
        const sendParams = {
          ref: '74430d47fa16b4c53c0fe59510752c70',
          musterilerID: user.userId
        }
        const newThis = this
        this.http.get<IOrder>( url, { params: sendParams } ).subscribe({
          next(res) {
             newThis.basket = res.orderList![0]
          },
          error(err) {
            console.error(err.message)
          }
        })
      }
  }

}
