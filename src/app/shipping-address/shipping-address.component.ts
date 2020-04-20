import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'service/auth/auth.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {
  shippingForm:FormGroup;

  @Output() onNext = new EventEmitter<number>();
  constructor(private fb:FormBuilder, public auth:AuthService) { }
  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      address:[this.auth.currentuser.shippingAddress,[
        Validators.required,
      ]],
      creditCard:[this.auth.currentuser.creditCard,[
        Validators.required,
      ]],
      cvv:[this.auth.currentuser.cvv,[
        Validators.required,
      ]],
    })
  }

  get address(){
    return this.shippingForm.get('address');
  }

  get creditCard(){
    return this.shippingForm.get('creditCard');
  }

  get cvv(){
    return this.shippingForm.get('cvv');
  }

  shippingSend(){
    console.log(`Submitted Shipping Form with address ${this.shippingForm.value.address}`)
    this.auth.address = this.shippingForm.value.address;
    this.auth.CVV = this.shippingForm.value.cvv;
    this.auth.creditCard = this.shippingForm.value.creditCard;
    this.onNext.emit(1);
  }

}
