import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import  firebase  from 'firebase/app'
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState){
        return null;
      } else {
        return authState.uid;
      }
    })
  );
  isAdmin = this.uid.pipe(
    switchMap( uid =>{
      if (!uid) {
        return observableOf(false);
      } else {
        return this.db.object('/admins/' + uid).valueChanges();
      }
    })
  );
  
  
  constructor( private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router, private storage: AngularFireStorage )  { }

  navigateTo(){
    this.router.navigate(['admin-panel'])
  }
  login(){
    const authPromise = this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    
    authPromise.then((result) => {
      
      let uidFromDb;
      
      firebase.database().ref('/admins/' + result.user.uid).once('value').then((snapshot) => {

        uidFromDb = snapshot.val();

        if(uidFromDb == true) {
          //is admin
          this.navigateTo();
        } else {
          //isn't admin
          console.log("PERMISSION DENIED!");
          firebase.auth().currentUser.delete();
        }

      });



    });
  }

  logout(){
    this.afAuth.signOut();
  }


  dothething(event){
    const file = event.target.files[0];
    const filePath = 'updates/' + file.name;
    this.storage.upload(filePath,file)
    .then(() => {
      console.log('upload successful')
    }).catch(() => {
      console.log('PERMISSION DENIED BITCH')
    });
    //this.storage.upload()
    // var listRef = this.storage.ref('updates');
    
    // listRef.listAll().forEach((item)=>{
    //   item.items.forEach((thing) => {
    //     thing.getDownloadURL().then((message) => {
          
    //       var fullUrl: String; 
    //       fullUrl = message;
          
    //       var re = /F\d{1,2}\.PNG/gi;
    //       var re2 = /\.PNG/gi;
    //       var findex = fullUrl.search(re);
    //       var sindex = fullUrl.search(re2);

    //       var updateNo = fullUrl.slice(findex + 1, sindex);
    //       var uNo: number = +updateNo;
          
    //       var dataRef = this.db.object('updates/update' + uNo)

    //       dataRef.set({
    //         id: uNo,
    //         imgurl: fullUrl,
    //         caption: 'TODO'
    //       });

    //       console.log('updtNo: ' + updateNo + ' url: ' + fullUrl);

    //     })
    //   })
    // })

  }


}

