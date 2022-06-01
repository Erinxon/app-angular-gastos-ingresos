import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MenubarModule} from 'primeng/menubar';
import { MenuComponent } from './shared/components/menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonCustomComponent } from './shared/components/button-custom/button-custom.component';
import { TableCustomComponent } from './shared/components/table-custom/table-custom.component';
import {ButtonModule} from 'primeng/button';
import { SharedModule } from './shared/shared.module';
import { BillsModule } from './modules/bills/bills.module';
import { IncomeBillComponent } from './modules/income-bills/components/income-bill/income-bill.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    SharedModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#00000', 
      secondaryColour: '#00000', 
      tertiaryColour: '#00000'
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
