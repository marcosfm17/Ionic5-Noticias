import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment) segment: IonSegment;
  categorias = [ 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  segmentSelected: string = this.categorias[0]; 
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.segmentSelected=this.categorias[0];
    this.cargarNoticias(this.segmentSelected);
  }
  segmentChanged(event) {
    this.noticias = [];
    this.cargarNoticias(this.segment.value);
  }
  loadData(event){
    this.cargarNoticias(this.segment.value);
  }
  cargarNoticias(categoria, event?){
    this.noticiasService.getTopHeadLinesByCategory(categoria)
    .subscribe( resp => {
      if (resp.articles.length === 0){
        event.target.disabled = true;
      }
      this.noticias.push(... resp.articles);
      if (event){
        event.target.complete();
      }
  });
  }
}
