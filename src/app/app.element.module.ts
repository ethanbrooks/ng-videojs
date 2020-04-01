
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {VideoComponent} from './video.component';


// import {TransferHttpCacheModule} from '@nguniversal/common';
// import videojs from 'video.js';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    VideoComponent
  ],
  imports: [

    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: VideoComponent, pathMatch: 'full'},
    ]),

//    TransferHttpCacheModule,
 ////   videojs,
    BrowserModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  entryComponents: [VideoComponent],
//  bootstrap: [VideoComponent]
})

export class AppElementModule {
  constructor(private injector: Injector) {
    const myElement = createCustomElement(VideoComponent, { injector });
    customElements.define('app-video', myElement);
  }
  ngDoBootstrap() {}
}


