import { AppActions } from '../../types/redux-action-types';
import { NAVIGATE_TO } from '../../constants/redux-actions';

export const navigateTo = (route: string, params?: any): AppActions => ({ type: NAVIGATE_TO, route, params });
