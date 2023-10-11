import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // INIZIALIZZAZIONE DELLE VARIABILI D'AMBIENTE:
  title = 'Angular + Firebase';
  users: any[] = [];  // Inizializza un array di oggetti 'users'
  selectedUser: any = {};  // Inizializza un oggetto 'selectedUser' (rappresenta l'utente selezionato)
  isInserting = true;  // Inizializza una variabile booleana 'isInserting (verifica se l'utente è stato inserito)
  isEditing = false;  // Inizializza una variabile booleana 'isEditing' (verifica se l'utente è stato modificato)
  newUser: any = {};  // Inizializza un nuovo utente 'newUser' (rappresenta il nuovo utente da aggiungere)

  // INIETTA I SERVIZI NEL COSTRUTTORE
  constructor(private userService: UserService, private firebaseService: FirebaseService) { }

  // ----------------------------------------------------------------------------------------->
  // => VISUALIZZAZIONE:

  // IMPLEMENTA IL METODO DELL INTERFACCIA ONINIT
  ngOnInit() {
    this.loadUsers();  // Chiama la funzione 'loadUsers' al momento dell'inizializzazione del componente
  }

  // CARICA LA LISTA DEGLI UTENTI ALL'INIZIO
  async loadUsers() {
    this.users = await this.userService.getUsers();  // Assegna all'array 'users' la lista degli utenti ottenuta dal servizio
  }

  // ----------------------------------------------------------------------------------------->
  // => INSERIMENTO:

  // AGGIUNGI UN NUOVO UTENTE
  async addUser() {
    await this.userService.addUser(this.newUser);  // Chiama il servizio per aggiungere un nuovo utente
    this.newUser = {};  // Resetta l'utente nuovo
    this.loadUsers(); // Ricarica la lista degli utenti
    this.isInserting = true;  // Imposta 'isInserting' a true
  }

  // ----------------------------------------------------------------------------------------->
  // => MODIFICA:

  // ABILITA LE MODIFICHE DELL'UTENTE
  async updateUser(user: any) {
    this.selectedUser = { ...user };  // Copia l'utente selezionato nell'oggetto 'selectedUser'
    this.isInserting = false;  // Imposta 'isInserting' a false
    this.isEditing = true;  // Imposta 'isEditing' a true
  }

  // SALVA LE MODIFIHE APPORTATE ALL'UTENTE
  async saveChanges() {
    await this.userService.updateUser(this.selectedUser);
    this.isEditing = false;  // Imposta 'isEditing' a false
    this.selectedUser = {};  // Resetta l'utente selezionato
    this.loadUsers(); // Ricarica la lista degli utenti
  }

  // ANNULLA L'EDITING DELL'UTENTE
  cancelEdit() {
    this.selectedUser = {};  // Resetta l'utente selezionato
    this.isEditing = false;  // Imposta 'isEditing' a false
    this.isInserting = true;  // Imposta 'isInserting' a true
  }

  // ----------------------------------------------------------------------------------------->
  // => ELIMINAZIONE:

  // ELIMINA UN UTENTE
  async deleteUser(userId: string) {
    await this.userService.deleteUser(userId);  // Chiama il servizio per eliminare l'utente
    this.loadUsers(); // Ricarica la lista degli utenti
  }

  // ----------------------------------------------------------------------------------------->
  // => DETTAGLIO:

  // Visualizza i dettagli di un utente
  showDetails(user: any) {
    this.selectedUser = { ...user };  // Copia l'utente selezionato nell'oggetto 'selectedUser'
    this.isEditing = false;  // Imposta 'isEditing' a false
    this.isInserting = false;  // Imposta 'isInserting' a false
  }

  // Annulla la visualizzazione dei dettagli di un utente
  cancelView() {
    this.selectedUser = {};  // Resetta l'utente selezionato
    this.isInserting = true;  // Imposta 'isInserting' a true
  }

}
