import 'module-alias/register';

import validateEnv from 'config/env.validator';
import { envInterface } from 'types/env';

declare global {
  namespace NodeJS {
    interface Global {
      __ENV__: envInterface;
    }
  }
}
const envValidation = validateEnv();
if (envValidation.error) {
  throw envValidation.error;
} else {
  global.__ENV__ = envValidation.value;
}

import BigPull from 'bigpull';

new BigPull();