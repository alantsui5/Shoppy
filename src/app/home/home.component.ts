import { Component, OnInit } from '@angular/core';
import { Product } from "../../../interface/product";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  slides$: Observable<Product[]>;
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.slides$ = this.db.collection<Product>('notes',
      (ref: any) => ref.orderBy("name").endAt(4)
    ).valueChanges({ idField: 'id' })
  }
  /*
  public slides = [
    {
      name: "Product Name",
      image: "https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&auto=format&fit=crop&w=400&h=400&q=80",
      description: "lorem epsum",
      price: 12.5
    },
    {
      name: "Product Name",
      image: "https://images.unsplash.com/photo-1566864222010-d45675442c31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80",
      description: "lorem",
      price: 12.5
    },
    {
      name: "Product Name",
      image: "https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80",
      description: "lorem",
      price: 12.5
    },
    {
      name: "Product Name",
      image: "https://images.unsplash.com/photo-1538426455889-1311ea3dad57?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80",
      description: "lorem",
      price: 12.5
    },
  ];
  */
}
