import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { VideoComponent } from './video.component';

@NgModule({
  declarations: [
    VideoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [VideoComponent]
})
export class AppModule { }

