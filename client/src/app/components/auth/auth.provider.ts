import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { AuthLocalStorageService } from './auth.local-storage.service';
import { AuthService } from './auth.service';

export const provideAuth = (): EnvironmentProviders => {
  return makeEnvironmentProviders([AuthService, AuthLocalStorageService]);
};
