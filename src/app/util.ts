import { Bilgiler } from "./models/iuser";
import * as crypto from 'crypto-js';
import { environment } from "src/environments/environment";
 
export const fncUser = () => {
    const stUser = sessionStorage.getItem('user')
    if ( stUser ) {
        try {
            const u:Bilgiler = JSON.parse( decrypt(stUser) );
            return u;
        } catch (error) {
            return null;
        }
    }else {
       return null; 
    }
}


export const fncDateConvert = ( stDate: string ) => {

    let stReturn = ''
    const date = new Date( stDate )

    stReturn += date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();
    stReturn += ":"+ (date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes());
    stReturn += ":"+(date.getHours() < 10 ? "0"+date.getHours() : date.getHours() );
    stReturn += " ";
    
    stReturn += date.getDate() < 10 ? "0"+date.getDate() : date.getDate()  // ayın kaçıncı günü
    stReturn += "-"+( (date.getMonth() + 1) < 10 ? "0"+(date.getMonth() + 1) : (date.getMonth() + 1)) // kaçında ay
    stReturn += "-"+date.getFullYear() // yıl

    if ( stReturn.includes("NaN") ) {
        return stDate;
    }

    return stReturn;
}


export const encrypt = ( plaintText:string ) => {
    var ciphertext = crypto.AES.encrypt( plaintText , environment.privateKey ).toString();
    return ciphertext;
}

export const decrypt = ( ciphertext:string ) => {
    var bytes  = crypto.AES.decrypt(ciphertext, environment.privateKey );
    var plaintText = bytes.toString(crypto.enc.Utf8);
    return plaintText;
}

export const rememberControl = () => {
    const stUser = localStorage.getItem('user')
    if ( stUser ) {
        sessionStorage.setItem('user', stUser);
        return true
    }else {
        return false
    }
}
