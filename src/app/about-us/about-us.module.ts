import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import {AboutUsComponent} from "./about-us/about-us.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    AboutUsComponent
  ]
})
export class AboutUsModule { }
