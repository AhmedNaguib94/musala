import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddEditGatewayComponent } from './ui/add-edit-gateway/add-edit-gateway.component';
import { SpinnerComponent } from './ui/shared/component/spinner/spinner.component';
import { StateSectionComponent } from './ui/shared/component/state-section/state-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddEditPeripheralComponent } from './ui/add-edit-peripheral/add-edit-peripheral.component';
import { GatewayListComponent } from './ui/gateway-list/gateway-list.component';
import { PeripheralListComponent } from './ui/peripheral-list/peripheral-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ConfirmationComponent } from './ui/shared/component/confirmation/confirmation.component';

registerLocaleData(en);

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatSnackBarModule
];

const ANT_MODUlES = [
  NzTableModule
];

@NgModule({
  declarations: [
    AppComponent,
    AddEditGatewayComponent,
    StateSectionComponent,
    SpinnerComponent,
    AddEditPeripheralComponent,
    GatewayListComponent,
    PeripheralListComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MATERIAL_MODULES,
    ANT_MODUlES,
  ],
  exports: [
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
