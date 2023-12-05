import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from './model/user.model';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit{

  dataSource = new MatTableDataSource<UserModel>;
  displayedColumns: string[] = ["name", "dtNascimento", "classificacao","actions" ];
  menuIndex?: number = undefined;
  labelAcaoAtualtemListaMenu = '';
  searchForm!: FormGroup;
  habilitaPesquisa = true;

  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };

  constructor(
    private api: UsuarioService,
  ){ }

  ngOnInit(): void {
    this.getUserslist(this.pageEvent);
  }

  openDialog( id?: number, mode?: string){
    // return this.dialog.open(ProdutosFormComponent, {
    //   width: "25%",
    //   data: { id, mode },
    // }).afterClosed().subscribe(() => {
    //   this.getProductslist(this.pageEvent);
    // })
  }

  getUserslist(event: PageEvent){
    if (this.pageEvent.pageSize !== event.pageSize){
      event.pageIndex = 0;
    }
    this.pageEvent = event;

    const key = this.searchForm?.controls['searchBy'].value;
    const value = this.searchForm?.controls['searchType'].value;

    this.pageEvent = event;
    let params = new HttpParams()
    // .set('_page', this.pageEvent.pageIndex)
    // .set('_limit', this.pageEvent.pageSize)

    if (!this.habilitaPesquisa) {
      params = params.set(key, value)
    }

    this.api.getAllUser(params).subscribe({
      next: (res): void => {
        this.dataSource = res;
        this.pageEvent.length = res.length;
      }
    })
  }

  deletUser(produtoId: number) {
    // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //   data: "Tem certeza que deseja excluir?",
    // });
    // dialogRef.afterClosed().subscribe((result: boolean) => {
    //   if(result){
    //     this.api.deleteProduto(produtoId).subscribe({
    //       next: () => {
    //         this.getProductslist(this.pageEvent);
    //         this._snackBar.open("Dados salvos com sucesso!!", '', {duration: 2000});
    //       },
    //       error: (error) => {
    //         console.log(error)
    //       }
    //     })
    //   }
    // });
};
}
