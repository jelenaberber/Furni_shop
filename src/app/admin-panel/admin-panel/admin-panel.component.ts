import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { UserService } from "./services/user.service";
import { ContactService } from "../../contact/contact/services/contact.service";
import { ProductsService } from "../../shop/shop/services/products.service";
import { IUser } from "../../shared/interfaces/iuser";
import { IMessage } from "../../shared/interfaces/imessage";
import { ProductsAdminService } from "./services/productsAdmin.service";
import { SharedModule } from "../../shared/shared.module";
import { ModalComponent } from "../../shared/components/modal/modal.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [SharedModule, ModalComponent],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  token: string | null = localStorage.getItem("authToken");
  numberOfUsers: number = 0;
  numberOfMessages: number = 0;
  numberOfProducts: number = 0;
  tableUsersColumns: { colName: string, displayName: string }[] = [
    { colName: 'first_name', displayName: 'First name' },
    { colName: 'last_name', displayName: 'Last name' },
    { colName: 'username', displayName: 'Username' },
    { colName: 'email', displayName: 'Email' },
    { colName: 'role_id', displayName: 'Role' }
  ];
  tableMessagesColumns: { colName: string, displayName: string }[] = [
    { colName: 'email', displayName: 'Email' },
    { colName: 'message', displayName: 'Message' },
    { colName: 'created_at', displayName: 'Created at' },
  ];
  tableProductsColumns: { colName: string, displayName: string }[] = [
    { colName: 'name', displayName: 'Name' },
    { colName: 'category', displayName: 'Category' },
    { colName: 'price', displayName: 'Price' },
    { colName: 'available', displayName: 'Available' }
  ];
  roleOptions: { name: string, id: number }[] = [
    { name: 'Admin', id: 2 },
    { name: 'User', id: 1 }
  ];
  users: IUser[] = [];
  messages: IMessage[] = [];
  products: any[] = [];
  messageShow: string = '';
  selectedProduct: any = [];
  categories: any = []

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private contactService: ContactService,
    private productsService: ProductsService,
    private productAdminService: ProductsAdminService
  ) {}

  ngOnInit() {
    if (!this.token || this.authService.isTokenExpired(this.token)) {
      this.router.navigate(['/home']);
    } else if (this.token) {
      let decodedToken = this.authService.decodeToken(this.token);

      if (decodedToken.role_id != 2) {
        this.router.navigate(['/home']);
      }
    }

    this.userService.getAllAdminPanel().subscribe({
      next: data => {
        this.users = data.map((user: IUser) => ({
          ...user,
          role_id: user.role.id
        }));
        this.numberOfUsers = data.length;
      },
      error: err => {
        console.log(err);
      }
    });

    this.contactService.getAllAdminPanel().subscribe({
      next: data => {
        this.messages = data;
        this.numberOfMessages = data.length;
      },
      error: err => {
        console.log(err);
      }
    });

    this.getProducts();
  }

  getProducts(){
    this.productAdminService.getAllAdminPanel().subscribe({
      next: data => {
        this.products = data;
        this.numberOfProducts = data.length;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onValueChange(event: { id: number, colName: string, value: any }) {
    this.messageShow = '';
    if (event.colName === 'role_id') {
      let idUser = event.id;
      let dataToSend = {
        role_id: event.value,
      };
      this.userService.update(idUser, dataToSend).subscribe({
        next: data => {
          this.messageShow = 'User role updated successfully';
        },
        error: err => {
          console.log('Error updating user role', err);
        }
      });
    } else if (event.colName === 'available') {
      this.productAdminService.changeAvailability(event.id).subscribe({
        next: data => {
          console.log('Product availability updated successfully', data);
        },
        error: err => {
          console.log('Error updating product availability', err);
        }
      });
    }
  }

  onDeleteUser(id: number) {
    this.messageShow = '';
    this.userService.delete(id).subscribe({
      next: data => {
        this.messageShow = 'User deleted successfully';
        this.users = this.users.filter(user => user.id !== id);
        this.numberOfUsers--;
      },
      error: err => {
        console.log('Error deleting user', err);
      }
    });
  }

  onDeleteMessage(id: number) {
    this.contactService.delete(id).subscribe({
      next: data => {
        this.messages = this.messages.filter((message: IMessage) => message.id !== id);
        this.numberOfMessages--;
      },
      error: err => {
        console.log('Error deleting message', err);
      }
    });
  }

  onDeleteProduct(id: number) {
    this.productAdminService.delete(id).subscribe({
      next: data => {
        this.products = this.products.filter((product: any) => product.id !== id);
        this.numberOfProducts--;
      },
      error: err => {
        console.log('Error deleting product', err);
      }
    });
  }

  onChangeProduct(id: number) {
    this.productAdminService.get(id).subscribe({
      next: data => {
        this.selectedProduct = data;
        this.modal.open(this.selectedProduct);
      },
      error: err =>{
        console.log(err);
      }
    })
  }

  openModalToAddProduct() {
    this.selectedProduct = null; // Postavljamo selectedProduct na null da bismo otvorili praznu formu
    this.modal.open(this.selectedProduct);
  }

  onProductUpdated(data: any) {
    this.getProducts();
  }
}
