import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';

import { NgxEchartsModule } from 'ngx-echarts';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    HomeRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    CoreModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [HomeModule],
})
export class HomeModule {}
