import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Constants } from "./core/common/constants";
import { AddEditGatewayComponent } from "./ui/add-edit-gateway/add-edit-gateway.component";
import { AddEditPeripheralComponent } from "./ui/add-edit-peripheral/add-edit-peripheral.component";
import { GatewayListComponent } from "./ui/gateway-list/gateway-list.component";
import { PeripheralListComponent } from "./ui/peripheral-list/peripheral-list.component";

const routes: Routes = [
  {
    path: Constants.ADD_EDIT_GATEWAY_PATH,
    component: AddEditGatewayComponent
  },
  {
    path: Constants.ADD_EDIT_GATEWAY_PATH + '/:id',
    component: AddEditGatewayComponent
  },
  {
    path: Constants.GATEWAY_LIST_PATH,
    component: GatewayListComponent
  },
  {
    path: Constants.ADD_EDIT_PERIPHERAL_PATH,
    component: AddEditPeripheralComponent
  },
  {
    path: Constants.ADD_EDIT_PERIPHERAL_PATH + '/:id',
    component: AddEditPeripheralComponent
  },
  {
    path: Constants.PERIPHERALS_LIST_PATH,
    component: PeripheralListComponent
  },
  {
    path: '**',
    redirectTo: Constants.GATEWAY_LIST_PATH
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
