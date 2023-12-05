import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from './model/user.model';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {

  dataSource = new MatTableDataSource<UserModel>;
  displayedColumns: string[] = ["name", "dtNascimento", "classificacao","actions" ];
  menuIndex: number | undefined = undefined;
  labelAcaoAtualtemListaMenu: string = '';


  openDialog( id?: number, mode?: string){
    // return this.dialog.open(ProdutosFormComponent, {
    //   width: "25%",
    //   data: { id, mode },
    // }).afterClosed().subscribe(() => {
    //   this.getProductslist(this.pageEvent);
    // })
  }

  deletProduct(produtoId: number) {
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
