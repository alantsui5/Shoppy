import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'service/auth/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from 'interface/product';
import * as firebase from 'firebase';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productadd',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductaddComponent implements OnInit {


  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  loading:boolean;
  @Input() file: File;
  task: AngularFireUploadTask;
  downloadURL: string;


  pForm: FormGroup;
  productsCollection: AngularFirestoreCollection<Product>;
  constructor(private storage: AngularFireStorage, private fb: FormBuilder, public auth: AuthService, private db: AngularFirestore, private message:NzMessageService, private router:Router) {
    this.productsCollection = db.collection<Product>('products');
  }
 
  ngOnInit() {
    this.pForm = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
      price: ['', [
        Validators.required,

      ]],
      description: ['',
        Validators.required,
      ],
      image:['',
      [Validators.required]],
    });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader;
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/click_upload.jpeg';
      this.selectedImage = null;
    }
  }

  async addProduct() {
    this.loading = true;
    const Id = this.db.createId();
    let name = this.pForm.value.name;
    let price = this.pForm.value.price;
    let description = this.pForm.value.description;
    let userId = this.auth.currentuser.uid;

    let filePath = `${name}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime() }`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() =>
        fileRef.getDownloadURL().subscribe((url) => {
          let imageUrl = url;
          //this.task = this.storage.upload(filePath, this.selectedImage);
          this.message.info("Your image is already uploaded")
          const product: Product = { Id, name, price, description, userId, createdAt: new Date().getTime(),image:imageUrl }
          this.db.collection('products').doc(Id).set(product);
          this.message.success("Your product is listed")
          this.resetForm();
          this.router.navigate([""])
        })
      )
    ).subscribe();
    this.loading = false;
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  resetForm() {
    this.pForm.reset();
    this.pForm.setValue({
      name: '',
      description: '',
      image: '',
      price: '',
    });
    this.imgSrc = '/assets/img/click_upload.jpeg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  get name() {
    return this.pForm.get('name');
  }

  get price() {
    return this.pForm.get('price');
  }
  get description() {
    return this.pForm.get('description');
  }

  get image() {
    return this.pForm.get('image');
  }

}
