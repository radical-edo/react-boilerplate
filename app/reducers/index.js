import { combineReducers } from 'redux';

import globalError from './global_errors';
import session from './session';

export const reducer = combineReducers({ globalError, session });
