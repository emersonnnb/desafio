import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuarioService } from '../services/usuario.service';
import { UserModel } from '../model/user.model';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-add-edit-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './add-edit-usuario.component.html',
  styleUrls: ['./add-edit-usuario.component.scss'],
})
export class AddEditUsuarioComponent implements OnInit {
  mode!: string;
  id!: number;
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditUsuarioComponent>,
    private api: UsuarioService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mode = this.data.mode;
    this.id = this?.data?.data?.id;

    this.form = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      dtBirth: ['', Validators.required],
      classification: ['', Validators.required],
    });

    switch (this.mode) {
      case 'create':
        this.form.enable();
        break;

      case 'view':
        this.form.disable();
        this.getUserId();
        break;

      case 'edit':
        this.form.enable();
        this.getUserId();
        break;
    }
  }

  addUsser() {
    const values = this.form.value;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.mode === 'create') {
      this.api.postUser(values).subscribe({
        next: () => {
          this.form.reset();
          this.dialogRef.close();
          this._snackBar.open('Dados salvos com sucesso!!', '', {
            duration: 2000,
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else this.save();
  }

  save() {
    const values = this.form.value;
    this.api.updateUser(this.id, values).subscribe({
      next: () => {
        this.dialogRef.close();
        this._snackBar.open('Dados salvos com sucesso!!', '', {
          duration: 2000,
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  private getUserId(): void {
    this.api.getIdUser(this.id).subscribe({
      next: (res: UserModel) => {
        this.form.patchValue(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  changeToEdit(): void {
    this.mode = "edit";
    this.form.enable();
  }

}
