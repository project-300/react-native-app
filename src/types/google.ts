import { GooglePlace } from './maps';
import { GooglePlaceDetails } from '@project-300/common-types';

export interface GooglePlacesSearchResult {
	status: string;
	predictions: GooglePlace[];
}

export interface GooglePlaceDetailsResult {
	status: string;
	result: GooglePlaceDetails;
}
