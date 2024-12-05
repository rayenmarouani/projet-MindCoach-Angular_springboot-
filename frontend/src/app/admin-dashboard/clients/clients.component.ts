import { Component, OnInit } from '@angular/core';
import { user } from '../../model/user';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit  {
  users?: user[]; // Liste des utilisateurs
  user?: user | null; // Utilisateur recherché (ou null si non trouvé)
  searchEmail: string = ''; // Email pour la recherche

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.UserList();
  }

  UserList() {
    this.userService.AllUser().subscribe(u => {
      console.log(u); // Vérifiez les données reçues
      this.users = u;

      // Vérifiez que chaque utilisateur a une catégorie
      this.users.forEach(user => {
        console.log('Nom de la catégorie:', user.categorie?.nomCategorie);
      });
    });
  }

  deleteUser(u: user) {
    // Confirmation avant de supprimer l'utilisateur
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Confirmation validée, procéder à la suppression
        this.userService.DeleteUser(u.id).subscribe({
          next: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            console.log("Utilisateur supprimé avec succès.");
            this.UserList(); // Rafraîchit la liste des utilisateurs
          },
          error: (err) => {
            console.error("Erreur lors de la suppression :", err);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the user.",
              icon: "error"
            });
          }
        });
      }
    });
  }
  onSearchByEmail() {
    this.userService.findByEmail(this.searchEmail).subscribe({
      next: (data) => {
        console.log('Utilisateur trouvé :', data);
        this.users = [data]; // Affecte uniquement l'utilisateur trouvé à la liste des utilisateurs
      },
      error: (err) => {
        console.error('Erreur lors de la recherche de l\'utilisateur :', err);
        this.users = []; // Vide la liste en cas d'erreur
      },
    });
  }
  clearSearch(): void {
    this.user = null;
    this.searchEmail = '';
  }
}


