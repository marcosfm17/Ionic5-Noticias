import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { browser } from 'protractor';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() i: number;
  @Input() enFavoritos = false;

  constructor(private iab: InAppBrowser,
              private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){
    let guardarBorrarbtn;
    if (this.enFavoritos){
      guardarBorrarbtn={
        text: 'Eliminar Favorito',
        icon: 'star',
        handler: () => {
          console.log('Favorito clicked');
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      };
    } else {
      guardarBorrarbtn={
        text: 'Favorito',
        icon: 'star',
        handler: () => {
          console.log('Favorito clicked');
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      //header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [/*{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, */
      {
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
       guardarBorrarbtn
      , {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
