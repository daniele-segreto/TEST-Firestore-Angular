import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore/lite';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // Inizializza l'app Firebase con la tua configurazione
  private app = initializeApp({
    // Inserisci qui la tua configurazione Firebase
    apiKey: "AIzaSyA08FYr7d8lSHWEJZ68Kg-WtQ7eHhJtpFY",
    authDomain: "test-firestore-angular.firebaseapp.com",
    projectId: "test-firestore-angular",
    storageBucket: "test-firestore-angular.appspot.com",
    messagingSenderId: "555745014781",
    appId: "1:555745014781:web:53a337978d14b288cc1f94"
  });

  // Ottieni un'istanza del database Firestore
  public db: Firestore = getFirestore(this.app);

  constructor() { }
}
