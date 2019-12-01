import { Coords } from '@project-300/common-types';
import { getDistance } from 'geolib';
import { Region } from 'react-native-maps';

class MapUtils {

	public static calculateMidpoint = (a: Coords, b: Coords): Coords => ({
		latitude: (a.latitude + b.latitude) / 2,
		longitude: (a.longitude + b.longitude) / 2
	})

	public static calculateMapCenter = (a: Coords, b: Coords): Region => {
		const m: Coords = MapUtils.calculateMidpoint(a, b);
		const distance = getDistance(
			{ latitude: a.latitude, longitude: a.longitude },
			{ latitude: b.latitude, longitude: b.longitude }
		) / 2;
		const circumference = 40075;
		const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
		const angularDistance = distance / circumference;
		const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
		const longitudeDelta = Math.abs(
			Math.atan2(
				Math.sin(angularDistance) * Math.cos(m.latitude),
				Math.cos(angularDistance) - Math.sin(m.latitude) * Math.sin(m.latitude)
			)
		);

		return {
			latitude: m.latitude,
			longitude: m.longitude,
			latitudeDelta,
			longitudeDelta
		};
	}

	private static _toRadians = (degrees: number): number => degrees * Math.PI / 180;

	private static _toDegrees = (radians: number): number => radians * 180 / Math.PI;

	public static direction = (xLat: number, xLng: number, yLat: number, yLng: number): number => {
		const xLatRad: number = MapUtils._toRadians(xLat);
		const xLngRad = MapUtils._toRadians(xLng);
		const yLatRad = MapUtils._toRadians(yLat);
		const yLngRad = MapUtils._toRadians(yLng);

		const y = Math.sin(yLngRad - xLngRad) * Math.cos(yLatRad);
		const x = Math.cos(xLatRad) * Math.sin(yLatRad) - Math.sin(xLatRad) * Math.cos(yLatRad) * Math.cos(yLngRad - xLngRad);

		let bearing = Math.atan2(y, x);
		bearing = MapUtils._toDegrees(bearing);

		return (bearing + 360) % 360;
	}

}

export default MapUtils;
