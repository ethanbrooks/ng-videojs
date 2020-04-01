import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
// import { HubConnection } from '@aspnet/signalr';
// import * as signalR from '@aspnet/signalr';

import videojs from 'video.js';
import 'videojs-overlay';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
/*
~/Documents/Bento4-SDK-1-5-1-628.universal-apple-macosx/bin/mp42hls ~/Downloads/BigBuckBunny_320x180.mp4
mp4hls --encryption-key baab6d0dd153762d945d5a060abb5fcd --output-encryption-key ~/Downloads/BigBuckBunny_320x180.mp4
*/
export class VideoComponent implements AfterViewInit {
  @ViewChild('myvid') vid: ElementRef<any>;
//  private _hubConnection: HubConnection | undefined;
  public async: any;

  poster = '/assets/images/banner0.jpg';

  fullScreen() {
    const mustClickElem = document.getElementById('must-click');
    const videoContentElem = document.getElementById('videocontent');
    mustClickElem.style.display = 'none';
    videoContentElem.style.display = 'block';

    const methodToBeInvoked = mustClickElem.requestFullscreen;
   //  ||mustClickElem.webkitRequestFullScreen
    //  || mustClickElem.mozRequestFullscreen
    //  || mustClickElem.msRequestFullscreen;
    if (methodToBeInvoked) { methodToBeInvoked.call(mustClickElem); }
  }

  ngAfterViewInit() {
    const options = {
      controls: false,
      fluid: true,
      preload: 'auto',
      loop: true,
      techOrder: ['html5'],
   };

    const player = new videojs(this.vid.nativeElement, options, function onPlayerReady() {
    player.overlay({
      content: 'This is the default.',
      align: 'top-right',
      class: 'big-red',
      overlays: [{
        content: 'It is playing now',
        align: 'top-left',
        class: 'little-green',
        start: 'play',
        end: 'pause'
      }]
    });

    player.on('pause', () => {
        console.log('show');
        document.getElementById('videocontent').innerHTML = '<span style="color:white; font-size: 72pt"><h1>Paused</h1></span>';
      });

    player.on('play', () => {
        console.log('hide');
        this.posterImage.hide();
      });


    console.log('Your player is ready!');
          // How about an event listener?
    this.on('ended', () => {
            console.log('Awww...over so soon?!');
          });
        });

/*
    this._hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://js.devexpress.com/Demos/NetCore/liveUpdateSignalRHub')
    .configureLogging(signalR.LogLevel.Information)
    .build();


    this._hubConnection.start().catch(err => console.error(err.toString()));

    this._hubConnection.on('updateStockPrice', (data: any) => {

//      const received = `Received: ${data.symbol}`;
//      console.log(received);
    let count = 0;
    const data: any = {symbol: 'MSFT'};

    if (data.symbol === 'MSFT') {
        count++;
        console.log(count);
        if (count === 1) {
          */
    console.log('PLAYING');
    player.src([
            {type: 'video/mp4', src: 'http://techslides.com/demos/sample-videos/small.mp4'}
// {type: 'video/mp4', src: 'https://hotel-herrera.s3.amazonaws.com/assets/video/mp4/LogoFull_1.mp4'}
          ]);
    const promise = player.play();
    if (promise !== undefined) {
            promise.then(() => {
              console.log('Autoplay started!');
              document.getElementById('videocontent').style.display = 'block';
              document.getElementById('must-click').style.display = 'none';
            }).catch((error) => {

              const d = new Date();
              const time = d.getTime();
              console.log('Autoplay was prevented at', time );
            });
          }
        }
      }
      /*
    }
}
*/
