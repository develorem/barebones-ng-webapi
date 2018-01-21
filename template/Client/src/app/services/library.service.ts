import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from './app-settings.service';

@Injectable()
export class LibraryService {

  constructor(private http: HttpClient, private appSettingsService:AppSettingsService) { }

  summary() {
    var path = this.appSettingsService.baseApiPath + 'library/summary';
    return this.http.get<Summary>(path).toPromise<Summary>();
  }
}

export class Summary
{
  numberOfBooks:number;
  numberOfSeries:number;
  numberOfAuthors:number;
}
