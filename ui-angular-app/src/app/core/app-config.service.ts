import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config: any;

  load(): Promise<void> {
    return fetch('assets/config.json')
      .then(res => res.json())
      .then(data => this.config = data);
  }

  get apiGatewayUrl(): string {
    return this.config?.apiGatewayUrl ?? '';
  }

  get securityServiceUrl(): string {
    return this.config?.securityServiceUrl ?? '';
  }

}
