import { Injectable } from '@angular/core';
import { Users } from './users';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor() { }
  getProductsData() {
    return [
      [
        {
          "id": "1000",
          "name": "John Doe",
          "username": "jane_doe",
          "email": "john.doe@example.com",
          "phone": "+91 7384838347",
          "status": "Active",
          "locked": "No",
          "admin": "Yes",
          "role": "Doc Import"
        },
        {
          "id": "1001",
          "name": "Alice Smith",
          "username": "alice_smith",
          "email": "alice.smith@example.com",
          "phone": "+91 7384838348",
          "status": "Inactive",
          "locked": "Yes",
          "admin": "No",
          "role": "Gate Operations"
        },
        {
          "id": "1002",
          "name": "Bob Johnson",
          "username": "bob_johnson",
          "email": "bob.johnson@example.com",
          "phone": "+91 7384838349",
          "status": "Active",
          "locked": "No",
          "admin": "No",
          "role": "Doc Import"
        },
        {
          "id": "1003",
          "name": "Carol White",
          "username": "carol_white",
          "email": "carol.white@example.com",
          "phone": "+91 7384838350",
          "status": "Active",
          "locked": "No",
          "admin": "Yes",
          "role": "Gate Operations"
        },
        {
          "id": "1004",
          "name": "David Brown",
          "username": "david_brown",
          "email": "david.brown@example.com",
          "phone": "+91 7384838351",
          "status": "Inactive",
          "locked": "No",
          "admin": "No",
          "role": "Doc Import"
        },
        {
          "id": "1005",
          "name": "Eva Green",
          "username": "eva_green",
          "email": "eva.green@example.com",
          "phone": "+91 7384838352",
          "status": "Active",
          "locked": "Yes",
          "admin": "Yes",
          "role": "Gate Operations"
        },
        {
          "id": "1006",
          "name": "Frank Harris",
          "username": "frank_harris",
          "email": "frank.harris@example.com",
          "phone": "+91 7384838353",
          "status": "Inactive",
          "locked": "No",
          "admin": "No",
          "role": "Doc Import"
        },
        {
          "id": "1007",
          "name": "Grace Martinez",
          "username": "grace_martinez",
          "email": "grace.martinez@example.com",
          "phone": "+91 7384838354",
          "status": "Active",
          "locked": "No",
          "admin": "Yes",
          "role": "Gate Operations"
        },
        {
          "id": "1008",
          "name": "Hank Wilson",
          "username": "hank_wilson",
          "email": "hank.wilson@example.com",
          "phone": "+91 7384838355",
          "status": "Inactive",
          "locked": "Yes",
          "admin": "No",
          "role": "Doc Import"
        },
        {
          "id": "1009",
          "name": "Ivy Thompson",
          "username": "ivy_thompson",
          "email": "ivy.thompson@example.com",
          "phone": "+91 7384838356",
          "status": "Active",
          "locked": "No",
          "admin": "Yes",
          "role": "Gate Operations"
        },
        {
          "id": "1010",
          "name": "Jack Davis",
          "username": "jack_davis",
          "email": "jack.davis@example.com",
          "phone": "+91 7384838357",
          "status": "Inactive",
          "locked": "No",
          "admin": "No",
          "role": "Doc Import"
        }
      ]
    ];
  }
  getTotalUsers(users: Users[]): number {
    return users.length;
  }
  getActiveUsers(users: Users[]): number {
    return users.filter(user => user.status === 'Active').length;
  }
  getInactiveUsers(users: Users[]): number {
    return users.filter(user => user.status === 'Inactive').length;
  }
}
