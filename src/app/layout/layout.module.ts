import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { NavbarComponent } from './layout/components/header/components/navbar/navbar.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SharedModule
  ]
})
export class LayoutModule { }
