import React, { Component, ReactElement } from 'react';
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Props, State } from './interfaces';
import { JourneyMapState } from '../../../types/redux-reducer-state-types';
import { AppState } from '../../../store';
import { getJourneyDetails, startJourney, endJourney, driverMovement } from '../../../redux/actions';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import DriverLocation from '../../../services/driver-location';
import { Coords, Journey, Place } from '@project-300/common-types';
import { getDistance } from 'geolib';
import { Container } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

export class JourneyMap extends Component<Props, State> {

	public constructor(props: Props) {
		super(props);

		const journeyId: string = this.props.navigation.getParam('journeyId');

		this.state = {
			journeyId,
			driverRegion: {
				latitude: 54.27661,
				longitude: -8.47609,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121
			},
			currentPosition: {
				latitude: 54.27661,
				longitude: -8.47609,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121
			},
			midpoint: {
				latitude: 0,
				longitude: 0
			},
			routeTravelled: [
				{
					"latitude": 54.27661,
					"longitude": -8.47609
				},
				{
					"latitude": 54.27343,
					"longitude": -8.48042
				},
				{
					"latitude": 54.26829,
					"longitude": -8.48014
				},
				{
					"latitude": 54.26578,
					"longitude": -8.48118
				},
				{
					"latitude": 54.26246,
					"longitude": -8.48112
				},
				{
					"latitude": 54.25849,
					"longitude": -8.4797
				},
				{
					"latitude": 54.25223,
					"longitude": -8.47718
				},
				{
					"latitude": 54.2452,
					"longitude": -8.47828
				},
				{
					"latitude": 54.24005,
					"longitude": -8.48172
				},
				{
					"latitude": 54.23714,
					"longitude": -8.48595
				},
				{
					"latitude": 54.23098,
					"longitude": -8.4941
				},
				{
					"latitude": 54.22696,
					"longitude": -8.49825
				},
				{
					"latitude": 54.22275,
					"longitude": -8.50008
				},
				{
					"latitude": 54.21924,
					"longitude": -8.49982
				},
				{
					"latitude": 54.21085,
					"longitude": -8.50187
				},
				{
					"latitude": 54.20666,
					"longitude": -8.50159
				},
				{
					"latitude": 54.20241,
					"longitude": -8.49785
				},
				{
					"latitude": 54.19957,
					"longitude": -8.4955
				},
				{
					"latitude": 54.19393,
					"longitude": -8.49304
				},
				{
					"latitude": 54.18869,
					"longitude": -8.48829
				},
				{
					"latitude": 54.18287,
					"longitude": -8.48567
				},
				{
					"latitude": 54.17746,
					"longitude": -8.48524
				},
				{
					"latitude": 54.17044,
					"longitude": -8.48611
				},
				{
					"latitude": 54.16811,
					"longitude": -8.48585
				},
				{
					"latitude": 54.16506,
					"longitude": -8.48404
				},
				{
					"latitude": 54.1598,
					"longitude": -8.47736
				},
				{
					"latitude": 54.15353,
					"longitude": -8.46748
				},
				{
					"latitude": 54.14828,
					"longitude": -8.46247
				},
				{
					"latitude": 54.13917,
					"longitude": -8.45297
				},
				{
					"latitude": 54.13287,
					"longitude": -8.44561
				},
				{
					"latitude": 54.12567,
					"longitude": -8.44008
				},
				{
					"latitude": 54.11856,
					"longitude": -8.42948
				},
				{
					"latitude": 54.10675,
					"longitude": -8.41319
				},
				{
					"latitude": 54.10138,
					"longitude": -8.40583
				},
				{
					"latitude": 54.09899,
					"longitude": -8.40043
				},
				{
					"latitude": 54.09782,
					"longitude": -8.39688
				},
				{
					"latitude": 54.09452,
					"longitude": -8.39303
				},
				{
					"latitude": 54.08589,
					"longitude": -8.38384
				},
				{
					"latitude": 54.07805,
					"longitude": -8.37408
				},
				{
					"latitude": 54.06952,
					"longitude": -8.36366
				},
				{
					"latitude": 54.06242,
					"longitude": -8.3536
				},
				{
					"latitude": 54.05558,
					"longitude": -8.34327
				},
				{
					"latitude": 54.05146,
					"longitude": -8.3403
				},
				{
					"latitude": 54.04054,
					"longitude": -8.33663
				},
				{
					"latitude": 54.03437,
					"longitude": -8.33776
				},
				{
					"latitude": 54.0288,
					"longitude": -8.3387
				},
				{
					"latitude": 54.02459,
					"longitude": -8.33627
				},
				{
					"latitude": 54.02158,
					"longitude": -8.33206
				},
				{
					"latitude": 54.01994,
					"longitude": -8.32757
				},
				{
					"latitude": 54.01845,
					"longitude": -8.31727
				},
				{
					"latitude": 54.01646,
					"longitude": -8.3005
				},
				{
					"latitude": 54.01247,
					"longitude": -8.28789
				},
				{
					"latitude": 54.00792,
					"longitude": -8.28174
				},
				{
					"latitude": 54.00447,
					"longitude": -8.27925
				},
				{
					"latitude": 54.00032,
					"longitude": -8.27795
				},
				{
					"latitude": 53.99468,
					"longitude": -8.27884
				},
				{
					"latitude": 53.98983,
					"longitude": -8.28122
				},
				{
					"latitude": 53.98673,
					"longitude": -8.28121
				},
				{
					"latitude": 53.98192,
					"longitude": -8.27804
				},
				{
					"latitude": 53.9737,
					"longitude": -8.2717
				},
				{
					"latitude": 53.97107,
					"longitude": -8.26776
				},
				{
					"latitude": 53.9694,
					"longitude": -8.26106
				},
				{
					"latitude": 53.96987,
					"longitude": -8.24806
				},
				{
					"latitude": 53.96883,
					"longitude": -8.22506
				},
				{
					"latitude": 53.9704,
					"longitude": -8.2078
				},
				{
					"latitude": 53.9701,
					"longitude": -8.20382
				},
				{
					"latitude": 53.96327,
					"longitude": -8.19466
				},
				{
					"latitude": 53.96112,
					"longitude": -8.19051
				},
				{
					"latitude": 53.95879,
					"longitude": -8.18318
				},
				{
					"latitude": 53.95778,
					"longitude": -8.1661
				},
				{
					"latitude": 53.9566,
					"longitude": -8.161
				},
				{
					"latitude": 53.95043,
					"longitude": -8.14935
				},
				{
					"latitude": 53.94867,
					"longitude": -8.14287
				},
				{
					"latitude": 53.94892,
					"longitude": -8.13495
				},
				{
					"latitude": 53.94898,
					"longitude": -8.12928
				},
				{
					"latitude": 53.94709,
					"longitude": -8.12185
				},
				{
					"latitude": 53.94336,
					"longitude": -8.11142
				},
				{
					"latitude": 53.94198,
					"longitude": -8.1044
				},
				{
					"latitude": 53.9414,
					"longitude": -8.09994
				},
				{
					"latitude": 53.94258,
					"longitude": -8.0964
				},
				{
					"latitude": 53.94351,
					"longitude": -8.09535
				},
				{
					"latitude": 53.9432,
					"longitude": -8.09318
				},
				{
					"latitude": 53.9441,
					"longitude": -8.08691
				},
				{
					"latitude": 53.94492,
					"longitude": -8.08636
				},
				{
					"latitude": 53.94518,
					"longitude": -8.08639
				},
				{
					"latitude": 53.94644,
					"longitude": -8.07967
				},
				{
					"latitude": 53.94546,
					"longitude": -8.07492
				},
				{
					"latitude": 53.93614,
					"longitude": -8.05371
				},
				{
					"latitude": 53.93357,
					"longitude": -8.04378
				},
				{
					"latitude": 53.93384,
					"longitude": -8.03713
				},
				{
					"latitude": 53.93663,
					"longitude": -8.02543
				},
				{
					"latitude": 53.93615,
					"longitude": -8.01221
				},
				{
					"latitude": 53.9335,
					"longitude": -8.00551
				},
				{
					"latitude": 53.92743,
					"longitude": -7.99878
				},
				{
					"latitude": 53.92086,
					"longitude": -7.98875
				},
				{
					"latitude": 53.91755,
					"longitude": -7.98011
				},
				{
					"latitude": 53.91408,
					"longitude": -7.97115
				},
				{
					"latitude": 53.91018,
					"longitude": -7.96549
				},
				{
					"latitude": 53.89965,
					"longitude": -7.95463
				},
				{
					"latitude": 53.88693,
					"longitude": -7.94287
				},
				{
					"latitude": 53.88406,
					"longitude": -7.93913
				},
				{
					"latitude": 53.88172,
					"longitude": -7.93483
				},
				{
					"latitude": 53.87951,
					"longitude": -7.93291
				},
				{
					"latitude": 53.87446,
					"longitude": -7.92915
				},
				{
					"latitude": 53.87134,
					"longitude": -7.92304
				},
				{
					"latitude": 53.86677,
					"longitude": -7.91043
				},
				{
					"latitude": 53.86272,
					"longitude": -7.90582
				},
				{
					"latitude": 53.8584,
					"longitude": -7.90627
				},
				{
					"latitude": 53.85275,
					"longitude": -7.90854
				},
				{
					"latitude": 53.84564,
					"longitude": -7.91113
				},
				{
					"latitude": 53.83974,
					"longitude": -7.91206
				},
				{
					"latitude": 53.83427,
					"longitude": -7.91198
				},
				{
					"latitude": 53.82808,
					"longitude": -7.91063
				},
				{
					"latitude": 53.82317,
					"longitude": -7.90843
				},
				{
					"latitude": 53.82074,
					"longitude": -7.90637
				},
				{
					"latitude": 53.81797,
					"longitude": -7.90311
				},
				{
					"latitude": 53.80793,
					"longitude": -7.88644
				},
				{
					"latitude": 53.80493,
					"longitude": -7.88024
				},
				{
					"latitude": 53.79825,
					"longitude": -7.87445
				},
				{
					"latitude": 53.79643,
					"longitude": -7.87263
				},
				{
					"latitude": 53.7941,
					"longitude": -7.86724
				},
				{
					"latitude": 53.79042,
					"longitude": -7.85918
				},
				{
					"latitude": 53.78886,
					"longitude": -7.85496
				},
				{
					"latitude": 53.78685,
					"longitude": -7.84386
				},
				{
					"latitude": 53.78285,
					"longitude": -7.83719
				},
				{
					"latitude": 53.78059,
					"longitude": -7.83564
				},
				{
					"latitude": 53.77475,
					"longitude": -7.83673
				},
				{
					"latitude": 53.77159,
					"longitude": -7.83641
				},
				{
					"latitude": 53.7683,
					"longitude": -7.83376
				},
				{
					"latitude": 53.76433,
					"longitude": -7.83624
				},
				{
					"latitude": 53.76357,
					"longitude": -7.83434
				},
				{
					"latitude": 53.75704,
					"longitude": -7.82442
				},
				{
					"latitude": 53.74919,
					"longitude": -7.81311
				},
				{
					"latitude": 53.74467,
					"longitude": -7.8078
				},
				{
					"latitude": 53.74354,
					"longitude": -7.80654
				},
				{
					"latitude": 53.74191,
					"longitude": -7.80278
				},
				{
					"latitude": 53.74181,
					"longitude": -7.80129
				},
				{
					"latitude": 53.74162,
					"longitude": -7.78624
				},
				{
					"latitude": 53.73992,
					"longitude": -7.78022
				},
				{
					"latitude": 53.73852,
					"longitude": -7.77746
				},
				{
					"latitude": 53.73445,
					"longitude": -7.77454
				},
				{
					"latitude": 53.72523,
					"longitude": -7.76734
				},
				{
					"latitude": 53.7217,
					"longitude": -7.7605
				},
				{
					"latitude": 53.71937,
					"longitude": -7.75454
				},
				{
					"latitude": 53.70444,
					"longitude": -7.66419
				},
				{
					"latitude": 53.70014,
					"longitude": -7.63445
				},
				{
					"latitude": 53.69858,
					"longitude": -7.62906
				},
				{
					"latitude": 53.69635,
					"longitude": -7.623
				},
				{
					"latitude": 53.69551,
					"longitude": -7.61521
				},
				{
					"latitude": 53.6926,
					"longitude": -7.60996
				},
				{
					"latitude": 53.69185,
					"longitude": -7.60847
				},
				{
					"latitude": 53.68555,
					"longitude": -7.58904
				},
				{
					"latitude": 53.67822,
					"longitude": -7.56625
				},
				{
					"latitude": 53.67375,
					"longitude": -7.55438
				},
				{
					"latitude": 53.67008,
					"longitude": -7.54326
				},
				{
					"latitude": 53.66465,
					"longitude": -7.5317
				},
				{
					"latitude": 53.65839,
					"longitude": -7.52214
				},
				{
					"latitude": 53.65594,
					"longitude": -7.52029
				},
				{
					"latitude": 53.64432,
					"longitude": -7.50242
				},
				{
					"latitude": 53.63664,
					"longitude": -7.48858
				},
				{
					"latitude": 53.63113,
					"longitude": -7.47449
				},
				{
					"latitude": 53.62652,
					"longitude": -7.4675
				},
				{
					"latitude": 53.62192,
					"longitude": -7.45954
				},
				{
					"latitude": 53.60918,
					"longitude": -7.43737
				},
				{
					"latitude": 53.60581,
					"longitude": -7.42472
				},
				{
					"latitude": 53.60548,
					"longitude": -7.41901
				},
				{
					"latitude": 53.60379,
					"longitude": -7.41067
				},
				{
					"latitude": 53.60186,
					"longitude": -7.40227
				},
				{
					"latitude": 53.5991,
					"longitude": -7.39395
				},
				{
					"latitude": 53.59663,
					"longitude": -7.38323
				},
				{
					"latitude": 53.59429,
					"longitude": -7.37744
				},
				{
					"latitude": 53.59274,
					"longitude": -7.37542
				},
				{
					"latitude": 53.58261,
					"longitude": -7.37004
				},
				{
					"latitude": 53.57126,
					"longitude": -7.36257
				},
				{
					"latitude": 53.56357,
					"longitude": -7.35641
				},
				{
					"latitude": 53.5567,
					"longitude": -7.3468
				},
				{
					"latitude": 53.54098,
					"longitude": -7.31515
				},
				{
					"latitude": 53.53617,
					"longitude": -7.3109
				},
				{
					"latitude": 53.52607,
					"longitude": -7.30537
				},
				{
					"latitude": 53.52419,
					"longitude": -7.3021
				},
				{
					"latitude": 53.52156,
					"longitude": -7.29344
				},
				{
					"latitude": 53.51308,
					"longitude": -7.26477
				},
				{
					"latitude": 53.51021,
					"longitude": -7.25255
				},
				{
					"latitude": 53.50771,
					"longitude": -7.24635
				},
				{
					"latitude": 53.5011,
					"longitude": -7.2347
				},
				{
					"latitude": 53.49711,
					"longitude": -7.22572
				},
				{
					"latitude": 53.49416,
					"longitude": -7.21409
				},
				{
					"latitude": 53.49138,
					"longitude": -7.20193
				},
				{
					"latitude": 53.48596,
					"longitude": -7.18723
				},
				{
					"latitude": 53.4787,
					"longitude": -7.16774
				},
				{
					"latitude": 53.46869,
					"longitude": -7.15147
				},
				{
					"latitude": 53.45967,
					"longitude": -7.13092
				},
				{
					"latitude": 53.45198,
					"longitude": -7.1107
				},
				{
					"latitude": 53.4468,
					"longitude": -7.07794
				},
				{
					"latitude": 53.44244,
					"longitude": -7.03109
				},
				{
					"latitude": 53.44013,
					"longitude": -7.01707
				},
				{
					"latitude": 53.43716,
					"longitude": -7.00691
				},
				{
					"latitude": 53.42633,
					"longitude": -6.98285
				},
				{
					"latitude": 53.42523,
					"longitude": -6.97281
				},
				{
					"latitude": 53.42645,
					"longitude": -6.95727
				},
				{
					"latitude": 53.42585,
					"longitude": -6.927
				},
				{
					"latitude": 53.42371,
					"longitude": -6.91645
				},
				{
					"latitude": 53.41378,
					"longitude": -6.90029
				},
				{
					"latitude": 53.41171,
					"longitude": -6.89305
				},
				{
					"latitude": 53.41147,
					"longitude": -6.88679
				},
				{
					"latitude": 53.4133,
					"longitude": -6.86872
				},
				{
					"latitude": 53.41183,
					"longitude": -6.85456
				},
				{
					"latitude": 53.40888,
					"longitude": -6.84553
				},
				{
					"latitude": 53.40544,
					"longitude": -6.8323
				},
				{
					"latitude": 53.40428,
					"longitude": -6.81918
				},
				{
					"latitude": 53.40497,
					"longitude": -6.79879
				},
				{
					"latitude": 53.40741,
					"longitude": -6.78621
				},
				{
					"latitude": 53.41156,
					"longitude": -6.76976
				},
				{
					"latitude": 53.41195,
					"longitude": -6.75279
				},
				{
					"latitude": 53.40971,
					"longitude": -6.72394
				},
				{
					"latitude": 53.40723,
					"longitude": -6.70387
				},
				{
					"latitude": 53.4045,
					"longitude": -6.69504
				},
				{
					"latitude": 53.40076,
					"longitude": -6.68738
				},
				{
					"latitude": 53.38763,
					"longitude": -6.66909
				},
				{
					"latitude": 53.38259,
					"longitude": -6.65803
				},
				{
					"latitude": 53.37652,
					"longitude": -6.63266
				},
				{
					"latitude": 53.36873,
					"longitude": -6.599
				},
				{
					"latitude": 53.36701,
					"longitude": -6.59011
				},
				{
					"latitude": 53.36665,
					"longitude": -6.58092
				},
				{
					"latitude": 53.36632,
					"longitude": -6.57316
				},
				{
					"latitude": 53.36378,
					"longitude": -6.55909
				},
				{
					"latitude": 53.36009,
					"longitude": -6.53441
				},
				{
					"latitude": 53.35773,
					"longitude": -6.50506
				},
				{
					"latitude": 53.35807,
					"longitude": -6.46851
				},
				{
					"latitude": 53.35243,
					"longitude": -6.45539
				},
				{
					"latitude": 53.35112,
					"longitude": -6.44948
				},
				{
					"latitude": 53.35108,
					"longitude": -6.442
				},
				{
					"latitude": 53.35253,
					"longitude": -6.43561
				},
				{
					"latitude": 53.35626,
					"longitude": -6.42773
				},
				{
					"latitude": 53.35879,
					"longitude": -6.42144
				},
				{
					"latitude": 53.35896,
					"longitude": -6.41321
				},
				{
					"latitude": 53.35624,
					"longitude": -6.39988
				},
				{
					"latitude": 53.35594,
					"longitude": -6.3925
				},
				{
					"latitude": 53.35719,
					"longitude": -6.38238
				},
				{
					"latitude": 53.35375,
					"longitude": -6.36654
				},
				{
					"latitude": 53.35309,
					"longitude": -6.36012
				},
				{
					"latitude": 53.35132,
					"longitude": -6.3572
				},
				{
					"latitude": 53.34883,
					"longitude": -6.34925
				},
				{
					"latitude": 53.34553,
					"longitude": -6.34615
				},
				{
					"latitude": 53.34458,
					"longitude": -6.34086
				},
				{
					"latitude": 53.34503,
					"longitude": -6.33123
				},
				{
					"latitude": 53.34291,
					"longitude": -6.31856
				},
				{
					"latitude": 53.34377,
					"longitude": -6.30801
				},
				{
					"latitude": 53.34552,
					"longitude": -6.2996
				},
				{
					"latitude": 53.34611,
					"longitude": -6.29281
				},
				{
					"latitude": 53.34735,
					"longitude": -6.29079
				},
				{
					"latitude": 53.3459,
					"longitude": -6.27645
				},
				{
					"latitude": 53.34626,
					"longitude": -6.26541
				},
				{
					"latitude": 53.34754,
					"longitude": -6.2594
				},
				{
					"latitude": 53.34977,
					"longitude": -6.26035
				}
			],
			//routeTravelled: [],
			movementCount: 0,
			tracker: null
		};
	}

	public async componentDidMount(): Promise<void> {
		const savedPos = await DriverLocation.getCurrentPosition(); // Get last updated location

		// this.setState({
		// 	currentPosition: {
		// 		...savedPos,
		// 		latitudeDelta: 0.015,
		// 		longitudeDelta: 0.0121
		// 	}
		// });

		await this._getJourneyDetails();

		if (this.props.journey && this.props.journey.journeyStatus === 'STARTED') {
			this._trackDriver();
			this._setRouteTravelled();
		}
		if (this.props.journey && this.props.journey.journeyStatus === 'NOT_STARTED') {
			this._setMidpoint();
			this._zoomToMidpoint();
		}
	}

	public componentWillUnmount(): void {
		this._stopTracking();
	}

	private _trackDriver = (): void => {
		const tracker: number = navigator.geolocation.watchPosition(async (location: Position) => {
			console.log('TRACK');
			this.setState({ movementCount: this.state.movementCount + 1 });

			const coords: Coords = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			};
			const region = {
				...coords,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121
			};

			this.setState({
				currentPosition: region,
				routeTravelled: this.state.routeTravelled.concat({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude
				})
			});

				//  && this.state.movementCount % 10 === 0
			if (this.props.journey) { // Save movement every 10 movements
				await this._updateSavedLocation(coords);
				await this.props.driverMovement(this.props.journey.journeyId, coords);
			}
		},
	 (error: PositionError) => console.log(error.message),
{ enableHighAccuracy: false, timeout: 5000, maximumAge: 10000, distanceFilter: 10 });

		console.log(tracker);
		this.setState({ tracker });
	}

	private _stopTracking = (): void => {
		const tracker: number = this.state.tracker as number;

		navigator.geolocation.clearWatch(tracker);

		this.setState({ tracker: null });
	}

	private _setRouteTravelled = (): void => this.props.journey && this.setState({ routeTravelled: this.props.journey.routeTravelled });

	private _setMidpoint = (): void => {
		const { origin, destination } = this.props.journey as Journey;

		this.setState({
			midpoint: {
				latitude: (origin.latitude + destination.latitude) / 2,
				longitude: (origin.longitude + destination.longitude) / 2
			}
		});
	}

	private _zoomToMidpoint = (): void => {
		const journey: Journey = this.props.journey as Journey;
		const { origin, destination } = journey;

		const distance = getDistance(
			{ latitude: origin.latitude, longitude: origin.longitude },
			{ latitude: destination.latitude, longitude: destination.longitude }
		) / 2;
		const circumference = 40075;
		const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
		const angularDistance = distance / circumference;
		const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
		const longitudeDelta = Math.abs(
			Math.atan2(
			Math.sin(angularDistance) * Math.cos(this.state.midpoint.latitude),
			Math.cos(angularDistance) - Math.sin(this.state.midpoint.latitude) * Math.sin(this.state.midpoint.latitude)
			)
		);

		this.setState({
			currentPosition: {
				latitude: this.state.midpoint.latitude,
				longitude: this.state.midpoint.longitude,
				latitudeDelta,
				longitudeDelta
			}
		});
	}

	private _getJourneyDetails = async (): Promise<void> => {
		await this.props.getJourneyDetails(this.state.journeyId);
	}

	private _updateSavedLocation = async (coords: Coords): Promise<void> => await DriverLocation.setCurrentPosition(coords);

	private _startJourney = async (): Promise<void> => {
		await this.props.startJourney(this.state.journeyId);
		// this._zoomToDriverPosition();
		this._trackDriver();
	}

	private _endJourney = async (): Promise<void> => {
		await this.props.endJourney(this.state.journeyId);
		this._stopTracking();
	}

	private _zoomToDriverPosition = (): void => {
		const currentPosition = this.state.currentPosition;

		this._map.animateCamera({
			center: {
				latitude: Number(currentPosition.latitude),
				longitude: Number(currentPosition.longitude)
			},
			pitch: 0,
			heading: 0,
			altitude: 200,
			zoom: 15
		}, {
			duration: 2000
		});
	}

	private _createMarker = (loc: Place): ReactElement => {
		return <Marker
			coordinate={ {
				latitude: loc.latitude,
				longitude: loc.longitude
			} }
			title={ loc.name }
		/>;
	}

	private _getMapRegion = (): Region => this.state.currentPosition;

	private _map: MapView = React.createRef<MapView>();

	public render(): ReactElement {
		const journey: Journey = this.props.journey as Journey;
		let spinnerText: string = '';
		if (this.props.isStarting) spinnerText = 'Starting...';
		if (this.props.isEnding) spinnerText = 'Ending...';

		return (
			<Container>
				<Spinner
					visible={ this.props.isStarting || this.props.isEnding }
					textContent={ spinnerText }
					textStyle={ styles.spinnerTextStyle }
				/>
				<View style={ styles.mapContainer }>
					<MapView
						provider={ PROVIDER_GOOGLE }
						style={ styles.map }
						region={ this._getMapRegion() }
						ref={ (m: MapView): MapView => this._map = m }
					>
						{ journey && this._createMarker(journey.origin) }
						{ journey && this._createMarker(journey.destination) }

						{
							journey && journey.plannedRoute &&
								<Polyline
									coordinates={ journey.plannedRoute }
									strokeColor={ 'red' }
									strokeWidth={ 4 }
								/>
						}

						{
							//journey && journey.journeyStatus === 'STARTED' &&
								<Polyline
									coordinates={ this.state.routeTravelled }
									strokeColor={ 'green' }
									strokeWidth={ 4 }
								/>
						}

						{
							this.props.isStarted &&
								<Marker
									coordinate={ this.state.currentPosition }
								/>
						}

						<Marker
							coordinate={ this.state.currentPosition }
						/>
					</MapView>
				</View>

				{
					journey &&
						<View style={ { ...styles.bottomPanel } }>
							{
								journey.journeyStatus === 'NOT_STARTED' &&
								<TouchableOpacity style={ styles.button } onPress={ this._startJourney }>
									<Text style={ styles.buttonText }>Start </Text>
								</TouchableOpacity>
							}

							{
								journey.journeyStatus === 'STARTED' &&
								<TouchableOpacity style={ styles.button } onPress={ this._endJourney }>
									<Text style={ styles.buttonText }>End</Text>
								</TouchableOpacity>
							}

							{
								journey.journeyStatus === 'FINISHED' &&
								<TouchableOpacity style={ styles.button } onPress={ (): void => {
									this.props.navigation.goBack();
								} }>
									<Text style={ styles.buttonText }>Done</Text>
								</TouchableOpacity>
							}
						</View>
				}
			</Container>
		);
	}
}

const mapStateToProps = (state: AppState): JourneyMapState => ({
	...state.journeyDetailsReducer
});

export default connect(mapStateToProps, {
	getJourneyDetails,
	startJourney,
	endJourney,
	driverMovement
})(JourneyMap);
