import { Injectable } from '@angular/core';
import AWSAppSyncClient from 'aws-appsync';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';

import { environment } from '../environments/environment';

@Injectable()
export class AppsyncService {
  hc;

  constructor() {
    const client = new AWSAppSyncClient({
      url: environment.graphqlEndpoint,
      region: environment.awsRegion,
      auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: environment.apiKey
      }
    });
    this.hc = client.hydrated;
  }
}
