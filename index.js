/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// export const BASE_URL = 'https://learning-api-rho.vercel.app';
export const BASE_URL = 'http://localhost:3001';

AppRegistry.registerComponent(appName, () => App);
