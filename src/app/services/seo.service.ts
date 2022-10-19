import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  updateTile(pageTitle: string) {
    this.title.setTitle(pageTitle)
  }

  updateMeta(name: string, content: string) {
    this.meta.updateTag( {name, content} )
  }

}
