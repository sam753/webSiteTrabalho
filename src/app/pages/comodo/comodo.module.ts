import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbCheckboxModule,
  NbLayoutModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbPopoverModule,
  NbContextMenuModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { ComodoComponent } from './comodo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ComodoDetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    NbCheckboxModule,  
    NbLayoutModule,
    NbRouteTabsetModule,
    NbMenuModule,
    NbSearchModule,
    NbSidebarModule,
    NbPopoverModule,
    NbContextMenuModule,
    ReactiveFormsModule
  ],
  declarations: [
    ComodoComponent,
    ComodoDetailComponent
  ],

})
export class ComodoModule { }
