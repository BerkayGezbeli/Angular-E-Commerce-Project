import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor( private http:HttpClient ) { }
  baseUrl = 'https://www.jsonbulut.com/json/'
  ref = '74430d47fa16b4c53c0fe59510752c70'

  // All Product
  allProduct () {
    const url = this.baseUrl + 'product.php'
    const sendParams = {
      ref: this.ref,
      start: '0'
    }
    return this.http.get<IProduct>( url, { params: sendParams } )
  }

}
