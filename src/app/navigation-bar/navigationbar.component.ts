import { Component, OnInit } from '@angular/core';
import { AuthService } from 'service/auth/auth.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.scss'],
  animations: [
    trigger('menuAnimation', [
      transition('void => *',

        animate('150ms ease-out',
          style({ opacity: 1.1, transform: 'scale(1)' }),
        )
      ),
      transition('* => void',
        animate('100ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' }),
        )
      ),
    ])
  ]
})
export class NavigationbarComponent implements OnInit {

  navitems = [
    { title: "Product", link: "/products", key: '1' },
    { title: "About Us", link: "/about", key: '2' },
    { title: "Cart", link: "/cart", key: '3' }
  ]
  title = "Shoppy";
  open = false;
  constructor(public auth: AuthService) { }
  toggler() {
    this.open = !this.open
  }
  ngOnInit() {

  }

}
