import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { TableComponent } from "../../shared/components/table/table.component";
import { UserService } from "./services/user.service";
import { ContactService } from "../../contact/contact/services/contact.service";
import { ProductsService } from "../../shop/shop/services/products.service";
import {IUser} from "../../shared/interfaces/iuser";
import {IMessage} from "../../shared/interfaces/imessage";
import {ProductsAdminService} from "./services/productsAdmin.service";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private contactService: ContactService,
    private productsService: ProductsService,
    private productAdminService: ProductsAdminService
  ) {}

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
  users:IUser[] = [];
  messages: IMessage[] = [];
  products = [];
  messageShow: string = '';

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
        console.log(data);
        this.userService.getAllAdminPanel().subscribe({
          next: (data: IUser[]) => {
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
        this.numberOfUsers = data.length;
      },
      error: err => {
        console.log(err);
      }
    });

    this.contactService.getAllAdminPanel().subscribe({
      next: data => {
        console.log(data);
        this.messages = data;
        this.numberOfMessages = data.length;
      },
      error: err => {
        console.log(err);
      }
    });

    this.productsService.getAllAdminPanel().subscribe({
      next: data => {
        console.log(data);
        this.products = data;
        this.numberOfProducts = data.length;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onValueChange(event: { id: number, colName: string, value: any }) {
    console.log('Value changed', event);
    this.messageShow = ''
    if (event.colName === 'role_id') {
      let idUser = event.id;
      let dataToSend = {
        role_id: event.value,
      }
      this.userService.update(idUser, dataToSend).subscribe({
        next: data => {
          this.messageShow = 'User role updated successfully'
        },
        error: err => {
          console.log('Error updating user role', err);
        }
      });
    }
    else if (event.colName === 'available') {
      // this.productsService.updateProductAvailability(event.id, event.value).subscribe({
      //   next: data => {
      //     console.log('Product availability updated successfully', data);
      //   },
      //   error: err => {
      //     console.log('Error updating product availability', err);
      //   }
      // });
    }
  }

  onDeleteUser(id: number) {
    this.messageShow = ''
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
    console.log('Deleting message', id);
    this.contactService.delete(id).subscribe({
      next: data => {
        console.log('Message deleted successfully', data);
        this.messages = this.messages.filter((message: IMessage) => message.id !== id); // Ispravljena sintaksa
        this.numberOfMessages--;
      },
      error: err => {
        console.log('Error deleting message', err);
      }
    });
  }

  onDeleteProduct(id: number) {
    console.log('Deleting product', id);
    this.productAdminService.delete(id).subscribe({
      next: data => {
        console.log('Product deleted successfully', data);
        this.products = this.products.filter((product: any) => product.id !== id);
        this.numberOfProducts--;
      },
      error: err => {
        console.log('Error deleting product', err);
      }
    });

  }
}
