import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';
import {ToastController} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  constructor(private storage: Storage, public toastController: ToastController) {
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article){
    if (!this.noticias.find(not=>not.title===noticia.title)){
      this.noticias.push(noticia);
      this.storage.set('favoritos', this.noticias);
    }
    this.presentToast('Agregado a Favoritos');
  }
  async cargarFavoritos(){
    const favoritos = await this.storage.get('favoritos');
    if (favoritos)
      this.noticias=favoritos;
    // return this.storage.get('favoritos')
    // .then(favoritos=>{
    //   console.log(favoritos);
    // });
  }

  borrarNoticia(noticia){
    this.noticias=this.noticias.filter(not=>not.title!==noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Eliminado de Favoritos');
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }
}
