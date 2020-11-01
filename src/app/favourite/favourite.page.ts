import { Component, OnInit } from '@angular/core';
import { GiphyService } from '../services/giphy.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  isLoaded: boolean = false;
  iteration = [].constructor(0);

  constructor(public giphyService: GiphyService,
              public toastService: ToastService) { }

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

  async removeSavedGiphy(index, id)
  {
    await this.giphyService.RemoveGiphyFromStorage(id);
    this.giphyService.savedGiphyList.splice(index, 1);
    this.iteration = [].constructor(Math.ceil(this.giphyService.savedGiphyList.length / 2));
    this.toastService.RemoveGiphyToast(id);
  }

}
