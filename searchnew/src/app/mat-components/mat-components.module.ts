import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatIconModule,
    Material.MatCardModule,
    Material.MatTabsModule,
    Material.MatAutocompleteModule,
    Material.MatPaginatorModule,
    Material.MatSelectModule
  ],
  exports:[
    Material.MatInputModule,
    Material.MatButtonModule,
    Material.MatIconModule,
    Material.MatCardModule,
    Material.MatTabsModule,
    Material.MatAutocompleteModule,
    Material.MatPaginatorModule,
    Material.MatSelectModule
  ]
})
export class MatComponentsModule { }
