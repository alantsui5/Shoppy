import { Component } from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations";
import { AuthService } from 'service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent {
  navitems = [
    { title: "Product", link: "/products" },
    { title: "About Us", link: "/about" },
    { title: "Cart", link: "/cart" }
  ]
  title = "Shoppy";
  open = false;
  constructor(public auth: AuthService) { }
  toggler() {
    this.open = !this.open
  }

}
