import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/pages.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnInit {

  pages: any[] = [];

  showForm = false;

  editId: number | null = null;

  newPage = {
    page_name: '',
    route: '',
    description: '',
    sort_order: 1,
    is_active: 1
  };

  constructor(
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    this.loadPages();
  }

  loadPages() {

    this.pageService
      .getAll()
      .subscribe((res: any) => {

        this.pages = res;

      });

  }

  savePage() {

    if (this.editId) {

      this.pageService
        .update(
          this.editId,
          this.newPage
        )
        .subscribe(() => {

          alert('Page berhasil diupdate');

          this.resetForm();

          this.loadPages();

        });

    } else {

      this.pageService
        .add(this.newPage)
        .subscribe({
          next: () => {

            alert('Page berhasil ditambah');

            this.resetForm();

            this.loadPages();

          },

          error: (err) => {

            alert(
              err.error?.message ||
              'Gagal menambah page'
            );

          }
        });

    }

  }

  editPage(page: any) {

    this.showForm = true;

    this.editId = page.id;

    this.newPage = {
      page_name: page.page_name,
      route: page.route,
      description: page.description,
      sort_order: page.sort_order,
      is_active: page.is_active
    };

  }

  deletePage(id: number) {

    if (confirm('Nonaktifkan page ini?')) {

      this.pageService
        .delete(id)
        .subscribe({
          next: (res: any) => {

            alert(res.message);

            this.loadPages();

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

    this.newPage = {
      page_name: '',
      route: '',
      description: '',
      sort_order: 1,
      is_active: 1
    };

  }

}