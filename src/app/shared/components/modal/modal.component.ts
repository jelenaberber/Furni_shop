import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import {CategoriesService} from "../../categories.service";
import {ProductsService} from "../../../shop/shop/services/products.service";
import {ProductsAdminService} from "../../../admin-panel/admin-panel/services/productsAdmin.service";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{

  constructor(private categoriesService: CategoriesService,
              private productsAdminService: ProductsAdminService) {}

  @Input() product: any | null = null;
  @Output() productUpdated: EventEmitter<any> = new EventEmitter<any>(); // Output event
  modalVisible: boolean = false;
  categories: any | null = null;
  changeProduct: boolean = false;
  productId: number = 0;
  message: string = '';

  ChangeProduct: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe({
      next: data => {
        this.categories = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  open(product: any | null) {
    if (product) {
      this.productId = product.id;
      this.changeProduct = true;
      this.ChangeProduct.patchValue({
        name: product.name,
        category_id: product.category_id,
        price: product.price,
        description: product.description
      });
    } else {
      this.changeProduct = false;
      this.ChangeProduct.reset();
    }
    this.modalVisible = true;
  }

  close() {
    this.product = null;
    this.modalVisible = false;
    this.message = '';
  }

  get name() {
    return this.ChangeProduct.get('name');
  }

  get description() {
    return this.ChangeProduct.get('description');
  }

  get category_id() {
    return this.ChangeProduct.get('category_id');
  }

  get price() {
    return this.ChangeProduct.get('price');
  }

  onChangeProduct() {
    if (this.ChangeProduct.valid) {
      let dataToSend = {
        name: this.name?.value,
        description: this.description?.value,
        price: this.price?.value,
        category_id: this.category_id?.value,
      };
      this.productsAdminService.updateProduct(this.productId, dataToSend).subscribe({
        next: (data: any) => {
          this.modalVisible = false;
          this.message = '';
          this.productUpdated.emit(data); // Emitujemo događaj ka roditeljskoj komponenti
        },
        error: err => {
          this.message = err.message;
        }
      })
    } else {
      this.ChangeProduct.markAllAsTouched();
    }
  }

  onAddProduct() {
    if (this.ChangeProduct.valid) {
      let dataToSend = {
        name: this.name?.value,
        description: this.description?.value,
        price: this.price?.value,
        category_id: this.category_id?.value,
      };
      this.productsAdminService.createWithToken(dataToSend).subscribe({
        next: (data: any) => {
          this.modalVisible = false;
          this.message = '';
          this.productUpdated.emit(data);
        },
        error: err => {
          this.message = err.message;
        }
      })
    } else {
      this.ChangeProduct.markAllAsTouched();
    }
  }
}
