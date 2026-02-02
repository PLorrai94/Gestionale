import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { NotificationService } from '../../../shared/notification/notification.service';

@Component({
  standalone: true,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private notify = inject(NotificationService);

  form!: FormGroup;
  rolesForm!: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  availableRoles = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_MANAGER'];

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      enabled: [true],
      accountNonLocked: [true]
    });

    this.rolesForm = this.fb.group({
      roles: [[]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userId = +id;
      this.userService.getById(this.userId).subscribe({
        next: user => {
          this.form.patchValue(user);
          this.rolesForm.patchValue({ roles: user.roles || [] });
        },
        error: () => this.notify.show('Failed to load user', 'error')
      });
    }
  }

  isRoleSelected(role: string): boolean {
    const roles: string[] = this.rolesForm.get('roles')?.value || [];
    return roles.includes(role);
  }

  toggleRole(role: string) {
    const roles: string[] = [...(this.rolesForm.get('roles')?.value || [])];
    const idx = roles.indexOf(role);
    if (idx >= 0) {
      roles.splice(idx, 1);
    } else {
      roles.push(role);
    }
    this.rolesForm.patchValue({ roles });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = { ...this.form.value, roles: this.rolesForm.value.roles };

    const op = this.isEditMode
      ? this.userService.update(this.userId!, data)
      : this.userService.create(data);

    op.subscribe({
      next: () => {
        this.notify.show(
          this.isEditMode ? 'User updated' : 'User created',
          'success'
        );
        this.router.navigate(['/admin/users']);
      },
      error: () => this.notify.show('Failed to save user', 'error')
    });
  }
}
