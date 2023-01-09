import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { PermessionTreeComponent } from './components/permession-tree/permession-tree.component';



@NgModule({
  declarations: [
    LoginComponent,
    PermessionTreeComponent
  ],
  exports: [
    LoginComponent,
    PermessionTreeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
