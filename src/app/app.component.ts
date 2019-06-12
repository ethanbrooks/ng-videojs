import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

import videojs from 'video.js';
import 'videojs-overlay';


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
  @ViewChild('myvid') vid: ElementRef<any>;
  private _hubConnection: HubConnection | undefined;
  public async: any;


  poster = 'https://s3.amazonaws.com/my.safepics.com/banner0.jpg';
  
  fullScreen() {
    let mustClickElem = document.getElementById('must-click');
    let videoContentElem = document.getElementById('videocontent');
    mustClickElem.style.display = 'none';
    videoContentElem.style.display = 'block';

    let methodToBeInvoked = mustClickElem.requestFullscreen 
      //||mustClickElem.webkitRequestFullScreen 
      || mustClickElem['mozRequestFullscreen']
      ||mustClickElem['msRequestFullscreen'];
    if (methodToBeInvoked) methodToBeInvoked.call(mustClickElem);
  }

  ngAfterViewInit() {
    const options = {
      controls: true,
      fluid: true,
      preload: 'auto',
      techOrder: ['html5'],
   };

    let player = new videojs(this.vid.nativeElement, options, function onPlayerReady() {

    player.overlay({
      content: 'Default overlay content',
      debug: true,
      overlays: [{
        content: 'The video is playing!',
        start: 'play',
        end: 'pause'
      }, {
        start: 0,
        end: 15,
        align: 'bottom-left'
      }, {
        start: 15,
        end: 30,
        align: 'bottom'
      }, {
        start: 30,
        end: 45,
        align: 'bottom-right'
      }, {
        start: 20,
        end: 'pause'
      }]
    });

     player.on('pause', function()
      {
        console.log('show');
        document.getElementById('videocontent').innerHTML = '<div style="color:white"><h1>FUCK YOU</h1></div>';
      });
    
      player.on('play', function()
      {
        console.log('hide');
        this.posterImage.hide();
      });


      console.log('Your player is ready!');
          // How about an event listener?
          this.on('ended', function() {
            console.log('Awww...over so soon?!');
          });
        });


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
          player.src([
//            {type: "video/mp4", src:"/assets/videos/14-01-17-103626-24.mp4"}
{type: "video/mp4", src:"https://hotel-herrera.s3.amazonaws.com/assets/video/mp4/HERRERA_1.mp4"}
          ]);
          var promise = player.play();    
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

  }
}
