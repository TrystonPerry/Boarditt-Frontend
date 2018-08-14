import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  @ViewChild('card1') card1: ElementRef;
  @ViewChild('card2') card2: ElementRef;
  @ViewChild('card3') card3: ElementRef;
  @ViewChild('card4') card4: ElementRef;
  @ViewChild('card5') card5: ElementRef;
  @ViewChild('card6') card6: ElementRef;
  @ViewChild('card7') card7: ElementRef;
  @ViewChild('card8') card8: ElementRef;
  @ViewChild('card9') card9: ElementRef;
  @ViewChild('card10') card10: ElementRef;

  constructor() { }

  ngOnInit() {
    this.moveCards();
  }

  moveCards() {

    let interval: number = 32;

    (() => {
      let card1 = document.getElementById('card-1');
      let x = -300;
  
      setInterval(() => {
        x -= 1;
        card1.style.transform = `translate(${x}px)`;
        if(x === -600){
          x = 2452;
          // 2495
        }
      }, interval)
    })();
  
    (() => {
      let card2 = document.getElementById('card-2');
      let x = -295;
  
      setInterval(() => {
        x -= 1;
        card2.style.transform = `translate(${x}px)`;
        if(x === -905){
          x = 2147;
        }
      }, interval)
    })();
  
    (() => {
      let card3 = document.getElementById('card-3');
      let x = -290;
  
      setInterval(() => {
        x -= 1;
        card3.style.transform = `translate(${x}px)`;
        if(x === -1210){
          x = 1842;
        }
      }, interval)
    })();
  
    (() => {
      let card4 = document.getElementById('card-4');
      let x = -285;
  
      setInterval(() => {
        x -= 1;
        card4.style.transform = `translate(${x}px)`;
        if(x === -1515){
          x = 1537;
        }
      }, interval)
    })();
  
    (() => {
      let card5 = document.getElementById('card-5');
      let x = -280;
  
      setInterval(() => {
        x -= 1;
        card5.style.transform = `translate(${x}px)`;
        if(x === -1820){
          x = 1232;
        }
      }, interval)
    })();
  
    (() => {
      let card6 = document.getElementById('card-6');
      let x = -275;
  
      setInterval(() => {
        x -= 1;
        card6.style.transform = `translate(${x}px)`;
        if(x === -2125){
          x = 927;
        }
      }, interval)
    })();
  
    (() => {
      let card7 = document.getElementById('card-7');
      let x = -270;
  
      setInterval(() => {
        x -= 1;
        card7.style.transform = `translate(${x}px)`;
        if(x === -2430){
          x = 622;
        }
      }, interval)
    })();
  
    (() => {
      let card8 = document.getElementById('card-8');
      let x = -265;
  
      setInterval(() => {
        x -= 1;
        card8.style.transform = `translate(${x}px)`;
        if(x === -2735){
          x = 317;
        }
      }, interval)
    })();
  
    (() => {
      let card9 = document.getElementById('card-9');
      let x = -260;
  
      setInterval(() => {
        x -= 1;
        card9.style.transform = `translate(${x}px)`;
        if(x === -3040){
          x = 12;
        }
      }, interval)
    })();
  
    (() => {
      let card10 = document.getElementById('card-10');
      let x = -255;
  
      setInterval(() => {
        x -= 1;
        card10.style.transform = `translate(${x}px)`;
        if(x === -3345){
          x = -293;
        }
      }, interval)
    })();

  }

}
