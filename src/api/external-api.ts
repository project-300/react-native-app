import { GooglePlaceDetailsResult, GooglePlacesSearchResult } from '../types/google';
import { GoogleMapsAPIKey } from '../../environment/env';

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

}
