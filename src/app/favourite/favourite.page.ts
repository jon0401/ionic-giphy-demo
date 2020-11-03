import { Component, OnInit } from '@angular/core';
import { GiphyService } from '../services/giphy.service';
import { ToastService } from '../services/toast.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  isLoaded: boolean = false;
  iteration = [].constructor(0);

  constructor(public giphyService: GiphyService,
              public toastService: ToastService,
              public alertService: AlertService) { }

  ngOnInit() {
  }

  ionViewDidEnter()
  {
    this.isLoaded = false;
    this.displaySavedGiphy();
  }

  displaySavedGiphy()
  {
    this.isLoaded = false;
    this.giphyService.DisplaySavedGiphy().then(()=>{
      this.iteration = [].constructor(Math.ceil(this.giphyService.savedGiphyList.length / 2));
      this.isLoaded = true;
    }).catch(()=>{
      this.toastService.GiphyErrorToast();
    });
  }

  async removeAllGiphy()
  {
    const alert = await this.alertService.RemoveAllGiphyAlert();
    await alert.onDidDismiss().then((data)=>{
      if (data.data === true)
      {
        this.giphyService.RemoveAllSavedGiphy();
        this.iteration = [].constructor(0);
        this.giphyService.savedGiphyList = [];
      }
    });
  }

  async removeSavedGiphy(index, id, image)
  {
    const alert = await this.alertService.RemoveGiphyAlert(image);
    await alert.onDidDismiss().then((data)=>{
      if (data.data === true)
      {
        this.confirmRemoveSavedGiphy(index, id);
      }
    });
  }

  protected async confirmRemoveSavedGiphy(index, id)
  {
    await this.giphyService.RemoveGiphyFromStorage(id);
    this.giphyService.savedGiphyList.splice(index, 1);
    this.iteration = [].constructor(Math.ceil(this.giphyService.savedGiphyList.length / 2));
    this.toastService.RemoveGiphyToast(id);
  }

}
