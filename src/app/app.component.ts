import { Component, OnInit } from '@angular/core';
import { AppsyncService } from './appsync.service';

import gql from 'graphql-tag';

const join = gql`
  mutation joinGame($username: String!) {
    joinGame(username: $username)
  }
`;

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
      client.mutate({
        mutation: join,
        variables: { username: 'Caleb' }
      });
    });
  }
}
