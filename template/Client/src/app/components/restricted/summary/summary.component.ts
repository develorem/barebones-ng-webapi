import { Component, OnInit } from '@angular/core';
import { LibraryService, Summary } from '../../../services/library.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.less']
})
export class SummaryComponent implements OnInit {

  summary:Summary;

  constructor(private libraryService:LibraryService) { 
    this.summary = new Summary();
    this.libraryService.summary().then(data => {
      this.summary = data;
    });
  }
 

  ngOnInit() {

  }


}
