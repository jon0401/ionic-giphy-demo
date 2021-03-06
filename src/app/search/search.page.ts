import { Component, OnInit, ViewChild } from '@angular/core';
import { GiphyService } from '../services/giphy.service';
import { ToastService } from '../services/toast.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('content') private content: any;

  searchQuery: string;
  isLoaded: boolean = false;
  iteration = [].constructor(0);


  constructor(public giphyService: GiphyService,
              public toastService: ToastService,
              public toastController: ToastController) { }

  ngOnInit() {
  }

  search()
  {
    this.isLoaded = false;
    if (this.searchQuery)
    {
      this.giphyService.SearchGiphy(this.searchQuery).then(()=>{
        this.isLoaded = true;
        this.iteration = [].constructor(Math.ceil(this.giphyService.giphyList.length / 2));
      }).catch(()=>{
        this.toastService.GiphyErrorToast();
      });
    }
  }

  clearSearch()
  {
    this.giphyService.keyword = null;
    this.giphyService.giphyList = [];
    this.isLoaded = false;
    this.scrollToTop();
  }

  loadMore(event)
  {
    if (this.isLoaded == true)
    {
      this.giphyService.LoadMoreGiphy(event).then(()=>{
        this.isLoaded = true;
        this.endEvent(event);
        this.iteration = [].constructor(Math.ceil(this.giphyService.giphyList.length / 2));
      }).catch(()=>{
        this.endEvent(event);
        this.toastService.GiphyErrorToast();
      });
    } else 
    {
      this.endEvent(event);
    }
  }

  async saveGiphy(id: string)
  {
    await this.giphyService.SaveGiphyToStorage(id);
    this.toastService.SaveGiphyToast(id);
  }


  protected endEvent(event)
  {
    if (event)
    {
      event.target.complete();
    } 
  }

  protected scrollToTop()
  {
    this.content.scrollToTop(800);
  }

}
