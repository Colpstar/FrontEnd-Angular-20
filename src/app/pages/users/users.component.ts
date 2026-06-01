import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  editId: number | null = null;

  showForm = false;

  newUser = {
    full_name: '',
    username: '',
    email: '',
    password: '',
    level_id: 1,
    is_active: 1
  };

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll()
      .subscribe((res: any) => {
        this.users = res;
      });
  }

  saveUser() {

    if (this.editId) {

      this.userService
        .update(
          this.editId,
          this.newUser
        )
        .subscribe(() => {

          alert('User berhasil diupdate');

          this.resetForm();

          this.loadUsers();

        });

    } else {

      this.userService
        .addUser(this.newUser)
        .subscribe(() => {

          alert('User berhasil ditambah');

          this.resetForm();

          this.loadUsers();

        });

    }

  }

  editUser(user: any) {

    this.showForm = true;

    this.editId = user.id;

    this.newUser = {
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      password: '',
      level_id: user.level_id,
      is_active: user.is_active
    };

  }

  deleteUser(id: number) {

    if(confirm('Hapus user ini?')) {

      this.userService
        .deleteUser(id)
        .subscribe(() => {

          this.loadUsers();

        });

    }

  }

  resetForm() {

    this.editId = null;

    this.showForm = false;

    this.newUser = {
      full_name: '',
      username: '',
      email: '',
      password: '',
      level_id: 1,
      is_active: 1
    };

  }

}