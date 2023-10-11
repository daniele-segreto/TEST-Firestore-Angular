import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore/lite';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // INIETTA IL SERVIZIO NEL COSTRUTTORE
  constructor(private firebaseService: FirebaseService) { }

  // ----------------------------------------------------------------------------------------->
  // OTTIENI LA LISTA DEGLI UTENTI DAL DATABASE
  async getUsers(): Promise<any[]> {  // Definisce una funzione asincrona che restituisce un array di oggetti any
    const usersCol = collection(this.firebaseService.db, 'users');  // Crea una collezione di documenti 'users' utilizzando il database di Firebase
    const usersSnapshot = await getDocs(usersCol);  // Ottiene lo snapshot (istantanea) della collezione
    return usersSnapshot.docs.map(doc => ({  // Mappa gli oggetti documento nell'array di oggetti da restituire
      id: doc.id,  // Aggiunge l'ID del documento all'oggetto restituito
      ...doc.data()  // Aggiunge i dati del documento all'oggetto restituito
    }));
  }

  // ----------------------------------------------------------------------------------------->
  // AGGIUNGI UN NUOVO UTENTE AL DATABASE
  async addUser(newUser: any) {  // Definisce una funzione asincrona che accetta un parametro newUser di tipo any
    const usersCol = collection(this.firebaseService.db, 'users');  // Crea una collezione di documenti 'users' utilizzando il database di Firebase
    await addDoc(usersCol, newUser);  // Aggiunge un nuovo documento con i dati del nuovo utente
  }

  // ----------------------------------------------------------------------------------------->
  // AGGIORNA UN UTENTE NEL DATABASE
  async updateUser(user: any) {  // Definisce una funzione asincrona che accetta un parametro user di tipo any
    const userDocRef = doc(this.firebaseService.db, 'users', user.id);  // Ottiene il riferimento al documento dell'utente da aggiornare
    const newData = {  // Crea un oggetto con i nuovi dati dell'utente
      nome: user.nome,  // Aggiunge il nuovo nome
      cognome: user.cognome  // Aggiunge il nuovo cognome
    };
    await updateDoc(userDocRef, newData);  // Aggiorna il documento con i nuovi dati
  }

  // ----------------------------------------------------------------------------------------->
  // ELIMINA UN UTENTE DAL DATABASE
  async deleteUser(userId: string) {  // Definisce una funzione asincrona che accetta un parametro userId di tipo stringa
    const userDocRef = doc(this.firebaseService.db, 'users', userId);  // Ottiene il riferimento al documento dell'utente da eliminare
    await deleteDoc(userDocRef);  // Elimina il documento
  }

}
