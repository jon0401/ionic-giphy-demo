import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})


export class GiphyService {

  public giphyList = [];
  public savedGiphyList = [];
  public startFrom: number = 0;
  public pageSize: number = 12;
  public keyword: string;
  private api_key: string = "gy7cZIOjo9onwFcxFkutCZjLqRJ4QuWH";

  constructor(private http: HttpClient) { }

  public async SearchGiphy (keyword: string): Promise<boolean>
  {
    console.log("Search Giphy: " + keyword);
    this.startFrom = 0;
    this.keyword = keyword;
    return this.SearchGiphyAPI(false);

  }

  public async LoadMoreGiphy (event): Promise<boolean>
  {
    console.log("LoadMoreGiphy");
    console.log(this.keyword);
    return this.SearchGiphyAPI(true);
  }

  public async DisplaySavedGiphy (): Promise<boolean>
  {
    this.savedGiphyList = [];
    var savedGiphyIDs = await this.GetGiphyFromStorage();

    return this.GetGifphyByIDsAPI(savedGiphyIDs);
  }

  // Giphy APIs

  private SearchGiphyAPI (isLoadMore: boolean): Promise<boolean>
  {
    return new Promise((resolve, reject) => {
      if (this.keyword)
      {
        let params = new HttpParams();
        params = params.append('api_key', this.api_key);
        params = params.append('q', this.keyword);
        params = params.append('limit', this.pageSize.toString());
        params = params.append('offset', this.startFrom.toString());
        // params = params.append('rating', 'r');

        this.http.get<any[]>("https://api.giphy.com/v1/gifs/search", { observe: 'response', params : params }).subscribe(res => {
          if (isLoadMore)
          {
            this.giphyList = this.giphyList.length == 0 ? res.body["data"] : [...this.giphyList, ...res.body["data"]];
            this.startFrom += this.pageSize;
          } else
          {
            this.giphyList = res.body["data"];
            this.startFrom += this.pageSize;
          }
          resolve(true);
        }, (err) => {
          reject(false);
          console.log(err);
        });
      } else
      {
        resolve(false);
      }
    });
  }

  private GetGifphyByIDsAPI (savedGiphyIDs): Promise<boolean>
  {
    return new Promise((resolve, reject) => {
      if (savedGiphyIDs)
      {
        let params = new HttpParams();
        params = params.append('api_key', this.api_key);
        params = params.append('ids', JSON.parse(savedGiphyIDs));
  
        this.http.get<any[]>("https://api.giphy.com/v1/gifs", { observe: 'response', params : params }).subscribe(res => {
          this.savedGiphyList = res.body["data"];
          resolve(true);
        }, (err) => {
          reject(false);
          console.log(err);
        });
      } else 
      {
        resolve(true);
      }
    })
  }


  // Storage-Related Giphy Methods

  public async GetGiphyFromStorage ()
  {
    const result = await Storage.get({key: "GiphyIDs"});
    console.log(JSON.parse(result.value));
    return result.value;
  }

  public async SaveGiphyToStorage (id: string)
  {
    var currentGiphyIDs = [];
    const storageValue = await this.GetGiphyFromStorage();
    if (storageValue)
    {
      currentGiphyIDs = JSON.parse(storageValue);

      // prevent the same id to be saved again
      if (!currentGiphyIDs.includes(id))
      {
        currentGiphyIDs.push(id);
      }

    } else
    {
      currentGiphyIDs.push(id);
    }
    await Storage.set({
      key: "GiphyIDs",
      value: JSON.stringify(currentGiphyIDs)
    });
  }

  public async RemoveGiphyFromStorage (id: string)
  {
    var currentGiphyIDs = [];
    const storageValue = await this.GetGiphyFromStorage();
    if (storageValue)
    {
      currentGiphyIDs = JSON.parse(storageValue);
      if (currentGiphyIDs.includes(id))
      {
        var foundIDIndex = currentGiphyIDs.indexOf(id);
        if (foundIDIndex >= 0)
        {
          currentGiphyIDs.splice(foundIDIndex, 1);
        }
      }
    }
    await Storage.set({
      key: "GiphyIDs",
      value: JSON.stringify(currentGiphyIDs)
    });
  }

  public async RemoveAllSavedGiphy ()
  {
    await Storage.remove({key: "GiphyIDs"});
  }

}