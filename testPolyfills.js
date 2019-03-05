/* global global */

import 'babel-polyfill';
import { URL, URLSearchParams } from 'url';

global.URL = URL;
global.URLSearchParams = URLSearchParams;
