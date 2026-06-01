import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss'
})
export class LevelsComponent implements OnInit {

  levels: any[] = [];

  showForm = false;

  editId: number | null = null;

  newLevel = {
    name: '',
    description: '',
    is_active: 1
  };

  constructor(
    private levelService: LevelService
  ) {}

  ngOnInit(): void {
    this.loadLevels();
  }

  loadLevels() {

    this.levelService
      .getAll()
      .subscribe((res: any) => {

        this.levels = res;

      });

  }

  saveLevel() {

    if (this.editId) {

      this.levelService
        .update(
          this.editId,
          this.newLevel
        )
        .subscribe(() => {

          alert('Level berhasil diupdate');

          this.resetForm();

          this.loadLevels();

        });

    } else {

      this.levelService
        .add(this.newLevel)
        .subscribe(() => {

          alert('Level berhasil ditambah');

          this.resetForm();

          this.loadLevels();

        });

    }

  }

  editLevel(level: any) {

    this.showForm = true;

    this.editId = level.id;

    this.newLevel = {
      name: level.name,
      description: level.description,
      is_active: level.is_active
    };

  }

  deleteLevel(id: number) {

    if(confirm('Nonaktifkan level ini?')) {

      this.levelService
        .delete(id)
        .subscribe({

          next: (res: any) => {

            alert(res.message);

            this.loadLevels();

          },

          error: (err) => {

            alert(err.error.message);

          }

        });

    }

  }

  resetForm() {

    this.showForm = false;

    this.editId = null;

    this.newLevel = {
      name: '',
      description: '',
      is_active: 1
    };

  }

}