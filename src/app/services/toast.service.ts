import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  public GiphyErrorToast ()
  {
    this.toastController.create({
      message: 'Sorry! Something wrong with our GIPHY service... :(',
      duration: 1500,
      color: "danger",
      position: "top"
    }).then((toast: HTMLIonToastElement)=>{
      toast.present();
    });
  }

  public SaveGiphyToast (id: string)
  {
    this.toastController.create({
      message: 'GIF (' + id + ') has been saved!',
      duration: 1500,
      color: "success",
      position: "bottom"
    }).then((toast: HTMLIonToastElement)=>{
      toast.present();
    });
  }

  public RemoveGiphyToast (id: string)
  {
    this.toastController.create({
      message: 'GIF (' + id + ') has been removed from your favourite!',
      duration: 1500,
      color: "dark",
      position: "bottom"
    }).then((toast: HTMLIonToastElement)=>{
      toast.present();
    });
  }
}
