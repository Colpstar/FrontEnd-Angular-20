import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PermissionService } from '../../services/permission.service';
import { LevelService } from '../../services/level.service';
import { PageService } from '../../services/pages.service';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent implements OnInit {

  permissions: any[] = [];

  levels: any[] = [];

  pages: any[] = [];

  selectedLevelId: number = 0;

  selectedPages: number[] = [];

  constructor(
    private permissionService: PermissionService,
    private levelService: LevelService,
    private pageService: PageService
  ) {}

  ngOnInit(): void {

    this.loadPermissions();

    this.levelService
      .getAll()
      .subscribe((res: any) => {
        this.levels = res;
      });

    this.pageService
      .getAll()
      .subscribe((res: any) => {
        this.pages = res;
      });

  }

  loadPermissions() {

    this.permissionService
      .getAll()
      .subscribe((res: any) => {
        this.permissions = res;
      });

  }

  togglePage(pageId: number) {

    const index =
      this.selectedPages.indexOf(pageId);

    if(index > -1) {

      this.selectedPages.splice(index, 1);

    } else {

      this.selectedPages.push(pageId);

    }

  }

  savePermission() {

    if(!this.selectedLevelId) {

      alert('Pilih level');

      return;

    }

    this.permissionService
      .save({
        level_id: this.selectedLevelId,
        page_ids: this.selectedPages
      })
      .subscribe(() => {

        alert('Permission berhasil disimpan');

        this.selectedPages = [];

        this.loadPermissions();

      });

  }

}