import { Injectable } from "@angular/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { User } from "../../interface/user";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { NzMessageService } from "ng-zorro-antd";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  /**
   * User Observable 
   */
  user$: Observable<User>;
  /**
   * currentuser logged in
   */ 
  currentuser: User;
  /**
   * Sync the edited user profile to user in database and authenticator
   */
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private message: NzMessageService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
    this.user$.subscribe((user) => {
      this.currentuser = user;
    });
  }
  getId(): string {
    return this.currentuser.uid;
  }

  get name(): string {
    return this.currentuser.displayName;
  }
/** 
   * Set creditcard value of user
   * @param {string} cardNumber user credit card number
   */
  set address(shipAddress: string) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${this.currentuser.uid}`
    );
    const shippingdata = { ...this.currentuser, shippingAddress: shipAddress };
    userRef.set(shippingdata, { merge: true });
  }
/** 
   * Set creditcard value of user
   * @param {string} cardNumber user credit card number
   */
  set creditCard(cardNumber: string) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${this.currentuser.uid}`
    );
    const shippingdata = { ...this.currentuser, creditCard: cardNumber };
    userRef.set(shippingdata, { merge: true });
  }
/** 
   * Set CVV of user
   * @param {number} CVV user credit card CVV number
   */
  set CVV(Cvv: number) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${this.currentuser.uid}`
    );
    const data = { ...this.currentuser, cvv: Cvv };
    userRef.set(data, { merge: true });
  }
/**
   * Perform user sign in, determine whether user has verified email
   * @param {string} email user email
   * @param {number} password user password
   */
  async emailSignIn(email: string, password: string) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
    if (credential.user.emailVerified === false) {
      this.message.error("The email is not verified");
      await this.signOut();
    } else {
      this.message.success("You have sucessfully Sign In");
      return this.updateUserData(credential.user);
    }
  }
  /**
   * Google signin function
   */
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }
/**
   * Sync the edited user profile to user in database and authenticator
   */  
  updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || "",
      emailVerified: user.emailVerified,
    };
    return userRef.set(data, { merge: true });
  }
/** 
   * Perform user register, put the detail of user to user database
   * @param {string} email user email
   * @param {number} password user password
   * @param {string} name user name
   */
  async register(email: string, password: string, name: string) {
    try {
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const credential2 = await this.afAuth.auth.currentUser.sendEmailVerification();
      const credential3 = await this.afAuth.auth.currentUser.updateProfile({
        displayName: name,
      });
      this.message.success("Register Success, please Verify Your email");
      await this.signOut();
    } catch (err) {
      this.message.error(err.message);
      console.log(err.code);
      console.log(err.message);
    }
  }
/** 
   * Perform user signout
   */
  async signOut() {
    await this.afAuth.auth.signOut();
    this.message.success("Sign Out Success");
    await this.router.navigate(["/"]);
  }
}
