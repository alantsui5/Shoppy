import { Component } from '@angular/core';
import { CartService } from 'service/cart/cart.service';
import { Product } from 'interface/product';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-cart2',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.css']
})
export class Cart2Component {
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;

  listOfSearchAddress: string[] = [];
  listOfData: Product[];
  listOfDisplayData: Product[];

  FaTrash = faTrash;

  constructor(public cartService: CartService) { }
  ngOnInit() {
    this.listOfData = this.cartService.items;
    this.listOfDisplayData = [...this.listOfData];
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  deleteItem(product: Product) {
    this.cartService.deleteFromCart(product);
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    this.search();
  }
  faTrash = faTrash;
  filterAddressChange(value: string[]): void {
    this.listOfSearchAddress = value;
    this.search();
  }


  search(): void {

    const filterFunc = (item: Product) => {
      return (
        item.name.indexOf(this.searchValue) !== -1
      );
    };
    const data = this.listOfData.filter((item: Product) => filterFunc(item));
    this.listOfDisplayData = data.sort((a, b) =>
      this.sortValue === 'ascend'
        ? a[this.sortName!] > b[this.sortName!]
          ? 1
          : -1
        : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
    );
  }


}
