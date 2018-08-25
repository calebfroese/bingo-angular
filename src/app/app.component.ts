import { Component, OnInit } from '@angular/core';
import { AppsyncService } from './appsync.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bingo-angular';

  constructor(public service: AppsyncService) {}

  ngOnInit() {
    this.service.hc().then(client => {
      console.log(client);
    });
  }
}
