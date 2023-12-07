import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from './model/user.model';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { UsuarioService } from './services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditUsuarioComponent } from './add-edit-usuario/add-edit-usuario.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog.component';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, MatDialogModule, MatSnackBarModule, MatSortModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<UserModel>();
  displayedColumns: string[] = [
    'name',
    'dtBirth',
    'classification',
    'actions',
  ];
  menuIndex?: number = undefined;
  labelAcaoAtualtemListaMenu = '';
  searchForm!: FormGroup;
  habilitaPesquisa = true;

  pageOrder = 'ASC';
  pageSort = 'name';
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };

  constructor(
    public dialog: MatDialog,
    private api: UsuarioService,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.getUserslist(this.pageEvent);
  }

  openDialog(data?: [], mode?: string) {
    return this.dialog
      .open(AddEditUsuarioComponent, {
        width: '25%',
        data: { data, mode },
      })
      .afterClosed()
      .subscribe(() => {
        this.getUserslist(this.pageEvent);
        this.menuIndex = undefined;
      });
  }

  getUserslist(event: PageEvent) {
    if (this.pageEvent.pageSize !== event.pageSize) {
      event.pageIndex = 0;
    }
    this.pageEvent = event;

    const key = this.searchForm?.controls['searchBy'].value;
    const value = this.searchForm?.controls['searchType'].value;

    this.pageEvent = event;

    let params = new HttpParams()

    if (this.pageOrder) {
      params = params
      .set('_order', this.pageOrder)
      .set('_sort', this.pageSort)
    }

    if (!this.habilitaPesquisa) {
      params = params.set(key, value);
    }

    this.api.getAllUser(params).subscribe({
      next: (res): void => {
        this.dataSource = res;
        this.pageEvent.length = res.length;
      },
    });
  }

  deletUser(userId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja excluir?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api.deleteUser(userId).subscribe({
          next: () => {
            this.getUserslist(this.pageEvent);
            this._snackBar.open('Dados salvos com sucesso!!', '', {
              duration: 2000,
            });
            this.menuIndex = undefined;
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }

  sortData(sort: Sort) {
    if (sort.active !== this.pageSort) {
      this.pageSort = sort.active;
    }
    this.pageOrder = (sort.direction || "ASC").toUpperCase();
    this.getUserslist(this.pageEvent);
  }
}
