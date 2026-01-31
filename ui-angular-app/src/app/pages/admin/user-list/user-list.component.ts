import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { NotificationService } from '../../../shared/notification/notification.service';

@Component({
  standalone: true,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [CommonModule, RouterModule]
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private confirmService = inject(ConfirmDialogService);
  private notify = inject(NotificationService);

  users: User[] = [];
  currentPage = 0;
  pageSize = 20;
  totalElements = 0;
  totalPages = 0;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll(this.currentPage, this.pageSize).subscribe({
      next: page => {
        this.users = page.content;
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
      },
      error: () => this.notify.show('Errore nel caricamento utenti', 'error')
    });
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadUsers();
    }
  }

  onEdit(user: User) {
    this.router.navigate(['/admin/users', user.id, 'edit']);
  }

  onDelete(user: User) {
    this.confirmService.confirm('Elimina Utente', `Eliminare l'utente "${user.username}"?`)
      .subscribe(confirmed => {
        if (confirmed) {
          this.userService.delete(user.id).subscribe({
            next: () => {
              this.notify.show('Utente eliminato', 'success');
              this.loadUsers();
            },
            error: () => this.notify.show('Errore durante l\'eliminazione', 'error')
          });
        }
      });
  }
}
