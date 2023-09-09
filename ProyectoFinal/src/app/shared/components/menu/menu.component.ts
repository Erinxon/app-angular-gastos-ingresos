import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserAuth } from '../../models/userAuth.model';
import { ProfileComponent } from '../profile/profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];
  itemsSubMenu!: MenuItem[];
  user!: UserAuth;

  constructor(private auth: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home'
      },
      {
        label: 'Ingresos',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink: '/income'
      },
      {
        label: 'Gastos',
        icon: 'pi pi-minus',
        routerLink: '/bills'
      },
      {
        label: 'Ingresos/Gastos',
        icon: 'pi pi-fw pi-clone',
        routerLink: '/income-bills'
      },
      {
        label: 'Calendario',
        icon: 'pi pi-calendar',
        routerLink: '/calendar'
      }
    ];
    this.itemsSubMenu = [
      {
        label: 'Perfil',
        icon: 'pi pi-fw pi-user',
        command: () => {
          this.dialog.open(ProfileComponent,{
          })
        }
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-power-off',
        command: () => { this.logout() },
      },
    ]
    this.user = this.auth.getUser();
  }

  logout(){
    this.auth.logout();
  }

  get getInitialName(){
    return `${this.user?.firstName?.charAt(0)}`
  }

}