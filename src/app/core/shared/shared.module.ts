import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],

})
export class SharedModule { }
