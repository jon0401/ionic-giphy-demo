import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController) { }

  public async RemoveGiphyAlert (image: string)
  {
    const alert = await this.alertController.create({
      header: 'Sure to REMOVE below GIF?',
      message: '<img src="' + image + '">',
      buttons: [
        {
          text: 'Sure',
          handler: () => {
            console.log("plz remove");
            alert.dismiss(true);
            return false;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log("nothing to do");
            alert.dismiss(false);
            return false;
          }
        }
      ]
    });

    await alert.present();
    return alert;
  }

  public async RemoveAllGiphyAlert ()
  {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: 'Are you sure you want to remove all your saved GIFs?',
      buttons: [
        {
          text: 'Sure',
          handler: () => {
            console.log("plz remove");
            alert.dismiss(true);
            return false;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log("nothing to do");
            alert.dismiss(false);
            return false;
          }
        }
      ]
    });

    await alert.present();
    return alert;
  }
}
