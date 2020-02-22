import {
	VEHICLE_MODELS_REQUEST,
	VEHICLE_MODELS_SUCCESS,
	VEHICLE_MODELS_FAILURE,
	VEHICLE_MAKES_REQUEST,
	VEHICLE_MAKES_SUCCESS,
	VEHICLE_MAKES_FAILURE
} from '../../constants/redux-actions';
import { VehicleMakesAndModelsState } from '../../types/redux-reducer-state-types';
import { VehicleMakesAndModelsTypes } from '../../types/redux-action-types';

const initialState: VehicleMakesAndModelsState = {
	isFetching: false,
	vehicleMakes: [],
	vehicleModels: []
};

const vehicleMakesAndModelsReducer = (
	state: VehicleMakesAndModelsState = initialState,
	action: VehicleMakesAndModelsTypes
): VehicleMakesAndModelsState => {
	switch (action.type) {
		case VEHICLE_MODELS_REQUEST:
			return { ...state, isFetching: true };
		case VEHICLE_MODELS_SUCCESS:
			return { ...state, isFetching: false };
		case VEHICLE_MODELS_FAILURE:
			return { ...state, isFetching: false };
		case VEHICLE_MAKES_REQUEST:
			return { ...state, isFetching: true };
		case VEHICLE_MAKES_SUCCESS:
			return { ...state, isFetching: false };
		case VEHICLE_MAKES_FAILURE:
			return { ...state, isFetching: false };
		default:
			return state;
	}
};

export default vehicleMakesAndModelsReducer;
