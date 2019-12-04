import { GoogleDirectionsRoute, GooglePlace, GooglePlaceDetails } from '@project-300/common-types';

export interface GooglePlacesSearchResult {
	status: string;
	predictions: GooglePlace[];
}

export interface GooglePlaceDetailsResult {
	status: string;
	result: GooglePlaceDetails;
}

export interface GoogleDirectionsResult {
	status: string;
	routes: GoogleDirectionsRoute[];
}

export interface GoogleNearbyPlaceResult {
	status: string;
	results: GooglePlaceDetails[];
}
