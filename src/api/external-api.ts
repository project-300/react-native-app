import {
	GoogleDirectionsResult,
	GooglePlaceDetailsResult,
	GooglePlacesSearchResult
} from '../types/google';
import { GoogleMapsAPIKey } from '../../environment/env';
import { Coords, GoogleDirectionsRoute } from '@project-300/common-types';
import Polyline from '@mapbox/polyline';

export default class ExternalApi {

	public static GooglePlaces = async (query: string): Promise<GooglePlacesSearchResult> => {
		let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}`;
		url += `&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry`;
		url += `&key=${GoogleMapsAPIKey}`;

		const res: Response = await fetch(url);

		const ok: boolean = res.ok;
		const data: GooglePlacesSearchResult = await res.json();

		if (!ok) throw data.error || Error('Unknown Error');
		return data;
	}

	public static GooglePlaceDetails = async (placeId: string): Promise<GooglePlaceDetailsResult> => {
		const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GoogleMapsAPIKey}`; // &session=${session}

		const res: Response = await fetch(url);

		const ok: boolean = res.ok;
		const data: GooglePlaceDetailsResult = await res.json();

		if (!ok) throw data.error || Error('Unknown Error');
		return data;
	}

	public static GoogleDirectionsRoute = async (origin: Coords, destination: Coords): Promise<Coords[]> => {
		const o = `${origin.latitude},${origin.longitude}`;
		const d = `${destination.latitude},${destination.longitude}`;

		const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${o}&destination=${d}&key=${GoogleMapsAPIKey}`;

		const res: Response = await fetch(url);

		const ok: boolean = res.ok;
		const data: GoogleDirectionsResult = await res.json();
		if (!ok) throw data.error || Error('Unknown Error');

		const route = ExternalApi._convertPointsToCoords(data.routes[0]);
		if (!route) throw Error('No route found');
		return route;
	}

	private static _convertPointsToCoords = (route: GoogleDirectionsRoute): Coords[] => {
		const points = Polyline.decode(route.overview_polyline.points);
		return points.map((point: number[]) => ({
			latitude: point[0],
			longitude: point[1]
		}));
	}

}
