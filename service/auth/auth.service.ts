import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../../interface/user';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  currentuser: User;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private message: NzMessageService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
    this.user$.subscribe(user => this.currentuser = user);
  }
  getId(): string {

    return this.currentuser.uid;
  }

  get name(): string {
    return this.currentuser.displayName;
  }

  set address(shipAddress: string) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.currentuser.uid}`);
    console.log(shipAddress);
    const shippingdata = { ...this.currentuser, shippingAddress: shipAddress};
    console.log(shippingdata);
    userRef.set(shippingdata, { merge: true });
  }

  set creditCard(cardNumber:string){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.currentuser.uid}`);
    const shippingdata = { ...this.currentuser, creditCard: cardNumber};
    userRef.set(shippingdata, { merge: true });
  }

  set CVV(Cvv: number){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.currentuser.uid}`);
    const data = { ...this.currentuser,cvv: Cvv};
    userRef.set(data, { merge: true });
  }

  async emailSignIn(email: string, password: string) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    if (credential.user.emailVerified === false) {
      console.log(credential.user);
      this.message.error('The email is not verified');
      await this.signOut();
    } else {
      this.message.success('You have sucessfully Sign In');
      return this.updateUserData(credential.user);
    }

  }
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || '',
      emailVerified: user.emailVerified,
    };
    return userRef.set(data, { merge: true });
  }

  async register(email: string, password: string, name: string) {
    try {
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      const credential2 = await this.afAuth.auth.currentUser.sendEmailVerification();
      const credential3 = await this.afAuth.auth.currentUser.updateProfile({ displayName: name });
      this.message.success('Register Success, please Verify Your email');
      await this.signOut();
    } catch (err) {
      this.message.error(err.message);
      console.log(err.code);
      console.log(err.message);
    }
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.message.success('Sign Out Success');
    await this.router.navigate(['/']);
  }
}
