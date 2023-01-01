import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GeneralResponse } from "../../common/enum";
import { GatewayApi } from "../api/gateway-api";
import { Gateway } from "../model";

@Injectable({
  providedIn: 'root',
})
export class GatewayRepository  {
  constructor(private gatewayApi: GatewayApi) { }

  addGateway(gateway: Gateway): Observable<GeneralResponse> {
    return this.gatewayApi.addGateway(gateway);
  }

  getAllGateways(): Observable<Gateway[]> {
    return this.gatewayApi.getAllGateways();
  }

  getGatewayById(gatewayId: string): Observable<Gateway> {
    return this.gatewayApi.getGatewayById(gatewayId);
  }

  deleteGateway(gatewayId: string): Observable<GeneralResponse> {
    return this.gatewayApi.deleteGateway(gatewayId);
  }
}
