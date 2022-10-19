import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressList, IAddress } from '../models/iaddress';
import { fncUser, fncDateConvert } from '../util';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { NgxSmartModalService } from 'ngx-smart-modal';
import { SeoService } from '../services/seo.service';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  faTrash = faTrash
  addres:AddressList = { }
  allAddress:AddressList[] = []
  modelAddres:AddressList = { }

  constructor( 
    private toast:ToastrService, 
    private http:HttpClient,
    public ngxSmartModalService: NgxSmartModalService,
    public seo: SeoService
  ) { }

  ngOnInit(): void {
    this.seo.updateTile("Addres")
    this.fncAllAddress()
  }

  fncAllAddress() {
    const bilgi = fncUser()
    if ( bilgi !== null ) {
      const url = 'https://www.jsonbulut.com/json/addressList.php'
      const sendParams = {
        ref: '74430d47fa16b4c53c0fe59510752c70',
        musterilerID: bilgi.userId
      }
      const newThis = this
      this.http.get<IAddress>( url, { params: sendParams } ).subscribe({
        next(res) {
          newThis.allAddress = res.addressList!
        },
        error(err) {
          console.error( err.message )
        }
      })
    }
  }

  fncAddressAdd() {
    const bilgi = fncUser()
    if ( bilgi !== null ) {
      this.addres.musterilerID = bilgi.userId
      
      if(this.addres.il === undefined || this.addres.il === "" ){
        this.toast.error("City can not be null!")
        console.log("data")
      }else if(this.addres.ilce === undefined || this.addres.ilce === ""){
        this.toast.error("Distinct can not be null!")
      }else if(this.addres.Mahalle === undefined || this.addres.Mahalle === ""){
        this.toast.error("Neighborhood can not be null!")
      }else if(this.addres.adres === undefined || this.addres.adres === ""){
        this.toast.error("Address can not be null!")
      }else if(this.addres.kapiNo === undefined || this.addres.kapiNo === ""){
        this.toast.error("No can not be null!")
      }else if(this.addres.not === undefined || this.addres.not === ""){
        this.toast.error("Note can not be null!")
      }else{

          // service call
          const url = 'https://www.jsonbulut.com/json/addressAdd.php'
          const sendParams = {
            ref: 'c7c2de28d81d3da4a386fc8444d574f2',
            musterilerID: this.addres.musterilerID,
            il: this.addres.il,
            ilce: this.addres.ilce,
            Mahalle: this.addres.Mahalle,
            adres: this.addres.adres,
            kapiNo: this.addres.kapiNo,
            notBilgi: this.addres.not
          }
          const newThis = this
          this.http.get( url, { params: sendParams } ).subscribe({
            next(res) {
              newThis.fncAllAddress()
            },
            error(err) {
              console.error(err.message)
            }
          })


      }

    }
    
  }

  // ?ref=c7c2de28d81d3da4a386fc8444d574f2&musterilerID=35&adresID=7
  fncRemove( adresID:string ) {
    const answer = confirm('Are you sure!');
    if ( answer ) {
    const bilgi = fncUser()
    if ( bilgi !== null ) {
      const url = 'https://www.jsonbulut.com/json/addressDelete.php';
      const sendParams = {
        ref: 'c7c2de28d81d3da4a386fc8444d574f2',
        musterilerID: bilgi.userId,
        adresID: adresID
      }
      const newThis = this
      this.http.get( url, { params: sendParams } ).subscribe({
        next(res) {
          newThis.fncAllAddress()
        },
        error(err) {
          console.error(err.message)
        }
      })
    }
  }
  }
  

  // addres detail
  funcDetail( index:number ) {
    
    const item = this.allAddress[index]
    if ( item.tarih ) {
      const newTarih = fncDateConvert( item.tarih.toString() );
      item.tarih = newTarih;
    }
    this.modelAddres = item
  }

}
