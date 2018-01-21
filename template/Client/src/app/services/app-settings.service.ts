import { Injectable } from '@angular/core';

@Injectable()
export class AppSettingsService {

  constructor() { }

  baseAppPath:string = "http://localhost/MyLibrary/";
  baseApiPath:string = this.baseAppPath + "api/";
  baseTokenPath:string = this.baseAppPath + "Token";
}
