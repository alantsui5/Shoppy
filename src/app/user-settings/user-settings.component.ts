import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'interface/user';
import { AuthService } from 'service/auth/auth.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',

  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private storage:AngularFireStorage, private auth:AuthService,
     private router:Router, private message:NzMessageService, private db:AngularFirestore,private fireauth:AngularFireAuth) {}


  /** Image uploader */
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  loading:boolean;
  @Input() file: File;
  task: AngularFireUploadTask;
  downloadURL: string;
  
  /** Fetch user details for that user */
  usersCollection: AngularFirestoreCollection<User>;
  
  /** Show image preview */
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
  
  /** The user input form */
  validateForm: FormGroup;

  /** Submit the user input(including the image) to backend */
  submitForm(): void {
   this.loading  = true;
   let name = this.validateForm.value.name;
   let address = this.validateForm.value.address;
   let creditCard = this.validateForm.value.creditCard;
   let cvv = this.validateForm.value.cvv;
   let userId = this.auth.currentuser.uid;
    console.log(userId)
   let filePath = `user/${userId}`;
   const fileRef = this.storage.ref(filePath);
   this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
    finalize(() =>
      fileRef.getDownloadURL().subscribe((url) => {
        let imageUrl = url;
        console.log(imageUrl);
        this.task = this.storage.upload(filePath, this.selectedImage);
        this.message.info("Your avatar is already updated");
        this.fireauth.auth.currentUser.updateProfile({
          displayName:name,
          photoURL:imageUrl
        })
        this.db.collection('users').doc(userId).set({shippingAddress:address, creditCard:creditCard, cvv:cvv, displayName:name, photoURL:imageUrl},{merge:true});
        this.message.success("Your detail is modified");
        this.router.navigate([""])
      })
    )
  ).subscribe();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name:[this.auth.currentuser.displayName],
      address:[this.auth.currentuser.shippingAddress],
      creditCard:[this.auth.currentuser.creditCard],
      cvv:[this.auth.currentuser.cvv],
      image:[this.auth.currentuser.photoURL],
    });
  }

  get name(){
    return this.validateForm.get('name');
  }

  get address(){
    return this.validateForm.get('address');
  }

  get creditCard(){
    return this.validateForm.get('creditCard');
  }

  get cvv(){
    return this.validateForm.get('cvv');
  }

  get image(){
    return this.validateForm.get("image");
  }
}
