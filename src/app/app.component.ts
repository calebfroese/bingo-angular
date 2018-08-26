import { Component, OnInit } from '@angular/core';
import { AppsyncService } from './appsync.service';
import { ApolloClient } from 'apollo-client';

import gql from 'graphql-tag';

const joinGame = gql`
  mutation joinGame($username: String!) {
    joinGame(username: $username) {
      username
    }
  }
`;
const allPlayers = gql`
  query {
    allPlayers {
      username
    }
  }
`;

const playersChanged = gql`
  subscription {
    subscribeToPlayersChanged {
      username
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username = '';
  players: any[];
  client: ApolloClient<any>;

  constructor(public service: AppsyncService) {}

  ngOnInit() {
    this.service.hc().then(client => {
      this.client = client;

      const obs = client.watchQuery({
        query: allPlayers,
        fetchPolicy: 'cache-and-network'
      });
      obs.subscribe(({ data }: any) => {
        console.log('Query fired');
        this.players = data.allPlayers;
      });

      const subscription = obs.subscribeToMore({
        document: playersChanged,
        updateQuery: (prev: any, data: any) => ({
          ...prev,
          allPlayers: [
            ...prev.allPlayers,
            data.subscriptionData.data.subscribeToPlayersChanged
          ]
        })
      });
    });
  }

  joinGame(username: string) {
    this.client
      .mutate({
        mutation: joinGame,
        optimisticResponse: {
          __typename: 'Mutation',
          joinGame: { __typename: 'Player', username }
        },
        variables: { username }
      })
      .then(({ data }: any) => {
        this.players = [...this.players, data.joinGame];
      });
  }
}
