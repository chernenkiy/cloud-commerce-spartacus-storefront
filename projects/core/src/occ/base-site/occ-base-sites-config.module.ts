import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { provideConfigFactory } from '../../config/config.module';
import {
  ConfigFromOccBaseSites,
  configFromOccBasesSitesFactory,
} from './occ-base-sites-config.providers';

@NgModule()
export class OccBaseSitesConfigModule {
  /**
   * Transforms the response of the OCC endpoint `/basesites` to the Site Context Config.
   */
  static forRoot(): ModuleWithProviders<OccBaseSitesConfigModule> {
    return {
      ngModule: OccBaseSitesConfigModule,
      providers: [
        provideConfigFactory(configFromOccBasesSitesFactory, [
          [new Optional(), ConfigFromOccBaseSites],
        ]),
      ],
    };
  }
}