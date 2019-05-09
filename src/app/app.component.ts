import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
//import videojs from 'video.js';
declare var videojs: any;
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/*
~/Documents/Bento4-SDK-1-5-1-628.universal-apple-macosx/bin/mp42hls ~/Downloads/BigBuckBunny_320x180.mp4
mp4hls --encryption-key baab6d0dd153762d945d5a060abb5fcd --output-encryption-key ~/Downloads/BigBuckBunny_320x180.mp4
*/
export class AppComponent implements AfterViewInit {
  @ViewChild('myvid') vid: ElementRef;
  private _hubConnection: HubConnection | undefined;
  public async: any;

  poster = 'https://s3.amazonaws.com/my.safepics.com/banner0.jpg';
  vidObj: any;
  
  ngAfterViewInit() {
    const options = {
      controls: false,
      fluid: true,
      preload: 'auto',
      techOrder: ['html5'],
   };


    this._hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://js.devexpress.com/Demos/NetCore/liveUpdateSignalRHub')
    .configureLogging(signalR.LogLevel.Information)
    .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));
    var count = 0;
    this._hubConnection.on('updateStockPrice', (data: any) => {
//      const received = `Received: ${data.symbol}`;
//      console.log(received);
      if(data.symbol == 'MSFT'){
        count++;
        console.log(count);
        if(count == 3){
          console.log('PLAYING');
          this.vidObj.src([
//            {type: "video/mp4", src:"/assets/videos/14-01-17-103626-24.mp4"}
            {type:"application/x-mpegURL", src:"/assets/videos/14-01-17-103626-27/stream.m3u8"}
          ]);
          var promise = this.vidObj.play();    
          if (promise !== undefined) {
            promise.then(function() {
              console.log('Autoplay started!');
              document.getElementById('videocontent').style.display = 'block';
              document.getElementById('must-click').style.display = 'none';              
            }).catch(function(error) {

              var d = new Date();
              var time = d.getTime();
              console.log('Autoplay was prevented at', time );
            });
          }
        }
      }
    });

    this.vidObj = new videojs(this.vid.nativeElement, options, function onPlayerReady() {
//      this.enterFullScreen();
      console.log('Your player is ready!');
      // How about an event listener?
      this.on('ended', function() {
        console.log('Awww...over so soon?!');
      });
    });
  }
}