import firebase from 'firebase';
export class AuthService {
    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    signin(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
    logOut(){
         firebase.auth().signOut();
    }
    getActiveUser(){
        return firebase.auth().currentUser;
    }
}