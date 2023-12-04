import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {
  planeVisible:boolean=false;

  constructor() { }

  changePlaneVisibility(){
    this.planeVisible=!this.planeVisible
  }

  showPlane(){
    this.planeVisible=true
  }

  hidePlane(){
    this.planeVisible=false
  }
}
