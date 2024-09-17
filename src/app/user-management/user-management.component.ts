import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserManagementService } from '../user-management.service';
import { Users } from '../users';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  // styles: [
  //   `:host ::ng-deep .p-dialog .product-image {
  //       width: 150px;
  //       margin: 0 auto 2rem auto;
  //       display: block;
  //   }`
  // ],
  providers: [MessageService, ConfirmationService, UserManagementService]
})
export class UserManagementComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  addUserDialog: boolean = false;
  productDialog: boolean = false;
  products!: Users[];
  product: Users = {};
  totalUsers: number = 0;
  activeUsers: number = 0;
  inactiveUsers: number = 0;
  user: any = {
    name: '',
    email: '',
    phone: null,
    loginMode: null,
    role: null,
    admin: false
  };
  //product!: Users;
  selectedProducts!: Users[] | null;
  submitted: boolean = false;
  statuses!: any[];
  roleOptions: any;
  filteredProducts!: Users[];
  searchTerm: any;
  constructor(private productService: UserManagementService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit() {
    const data = this.productService.getProductsData();
    this.products = data.flat().map(product => ({
      id: product.id,
      name: product.name,
      username: product.username,
      email: product.email,
      phone: product.phone,
      status: product.status === 'Active' || product.status === 'Inactive' ? product.status : undefined,
      locked: product.locked === 'Yes' || product.locked === 'No' ? product.locked : undefined,
      admin: product.admin === 'Yes',
      role: product.role === 'Doc Import' || product.role === 'Gate Operations' ? product.role : undefined,
    }));
    this.filteredProducts = [...this.products];
    this.products.forEach(user => {
      this.totalUsers++;
      if (user.status === 'Active') {
        this.activeUsers++;
      } else if (user.status === 'Inactive') {
        this.inactiveUsers++;
      }
    });
    this.statuses = [
      { label: 'Doc Import', value: 'Doc Import' },
      { label: 'Gate Operations', value: 'Gate Operations' },
    ];
    this.roleOptions = [
      { label: 'Export And Bonding', value: 'export_bonding' },
      { label: 'MSA', value: 'msa' },
      { label: 'Gate Operations', value: 'gate_operations' }
    ];
  }
  openNew() {
    this.user = {
      name: '',
      email: '',
      phone: null,
      loginMode: null,
      role: null,
      admin: false
    };
    this.submitted = false;
    this.addUserDialog = true;
  }
  filter() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      (product.username?.toLowerCase() || '').includes(term) ||
      (product.email?.toLowerCase() || '').includes(term)
    );
  }
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }
  editProduct(product: Users) {
    this.product = { ...product };
    this.productDialog = true;
  }
  deleteProduct(product: Users) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }
  hideDialog() {
    this.addUserDialog = false;
    this.productDialog = false;
    this.submitted = false;
  }
  isFormValid() {
    return this.user.name && this.user.email && this.user.phone && this.user.loginMode && this.user.role;
  }
  addUser() {
    this.submitted = true;
    this.submitted = true;
    // Validate that all fields are filled
    if (this.isFormValid()) {
      this.user.status = 'Active';
      this.user.locked = 'No';
      this.user.admin = this.user.admin ? 'Yes' : 'No';
      this.products.push(this.user);
      this.hideDialog();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }
  isValidUser() {
    return this.product.name && this.product.email && this.product.phone && this.product.role;
  }
  updateUser() {
    if (this.isValidUser()) {
      this.hideDialog();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }
  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }
}
