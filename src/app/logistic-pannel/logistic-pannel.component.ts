import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "service/auth/auth.service";
import { User } from "interface/user";
import * as firebase from "firebase";
@Component({
  selector: "app-logistic-pannel",
  templateUrl: "./logistic-pannel.component.html",
  styleUrls: ["./logistic-pannel.component.scss"],
})
export class LogisticPannelComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {}
  order$: Observable<any[]>;
  userId = "";
  ngOnInit(): void {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.order$ = this.db
          .collection("users")
          .doc(this.userId)
          .collection("orders")
          .valueChanges();
      }
    });
  }

  convertToDate(arrivalDateTimestamp) {
    const arrival_datetime = arrivalDateTimestamp.toDate();
    const formatted_date =
      arrival_datetime.getFullYear() +
      "-" +
      (arrival_datetime.getMonth() + 1) +
      "-" +
      arrival_datetime.getDate();
    return formatted_date;
  }

  isArrived(arrivalDateTimestamp) {
    let nowtime = firebase.firestore.Timestamp.now().valueOf();
    let arrivaltime = arrivalDateTimestamp.valueOf();
    return nowtime > arrivaltime;
  }
}
