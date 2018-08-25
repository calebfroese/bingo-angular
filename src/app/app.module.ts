import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppsyncService } from './appsync.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [AppsyncService],
  bootstrap: [AppComponent]
})
export class AppModule {}
