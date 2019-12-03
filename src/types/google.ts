import { GooglePlace } from './maps';

export interface GooglePlacesSearchResult {
	status: string;
	predictions: GooglePlace[];
}
