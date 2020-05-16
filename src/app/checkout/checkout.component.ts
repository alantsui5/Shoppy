import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  current = 0;

  index = 'First-content';



  /**
   * change the slide number of the page
   * @param {number} value The count from shopping address module 
   */
  changeCurrent(value:number){
    console.log("Go to change current")
    this.current = value;
  }

  done(): void {
    console.log('done');
  }

  constructor() {}
}
