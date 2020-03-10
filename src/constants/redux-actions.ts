export const NAVIGATE_TO: string = 'NAVIGATE_TO';

// Content Reload
export const CONTENT_RELOAD_ON: string = 'CONTENT_RELOAD_ON';
export const CONTENT_RELOAD_OFF: string = 'CONTENT_RELOAD_OFF';

// Location Tracking
export const START_LOCATION_TRACKING: string = 'START_LOCATION_TRACKING';
export const STOP_LOCATION_TRACKING: string = 'STOP_LOCATION_TRACKING';
export const SET_CURRENT_LOCATION: string = 'SET_CURRENT_LOCATION';

// Login
export const LOGIN_REQUEST: string = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: string = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE: string = 'LOGIN_FAILURE';

// Sign Up
export const SIGNUP_REQUEST: string = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS: string = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE: string = 'SIGNUP_FAILURE';

// Sign Up Confirmation
export const SIGNUP_CONFIRMATION_REQUIRED: string = 'SIGNUP_CONFIRMATION_REQUIRED';
export const SIGNUP_CONFIRMATION_REQUEST: string = 'SIGNUP_CONFIRMATION_REQUEST';
export const SIGNUP_CONFIRMATION_SUCCESS: string = 'SIGNUP_CONFIRMATION_SUCCESS';
export const SIGNUP_CONFIRMATION_FAILURE: string = 'SIGNUP_CONFIRMATION_FAILURE';

// Headerbar
// export const CURRENT_JOURNEY_REQUEST: string = 'CURRENT_JOURNEY_REQUEST';
// export const CURRENT_JOURNEY_SUCCESS: string = 'CURRENT_JOURNEY_SUCCESS';
// export const CURRENT_JOURNEY_FAILURE: string = 'CURRENT_JOURNEY_FAILURE';
export const RESET_CURRENT_JOURNEY_UPDATED_FLAG: string = 'RESET_CURRENT_JOURNEY_UPDATED_FLAG';
export const RESET_PICKUP_ALERTS: string = 'RESET_PICKUP_ALERTS';
export const CURRENT_JOURNEY: string = 'CURRENT_JOURNEY';
export const CURRENT_JOURNEY_SUB_RECEIVED: string = 'CURRENT_JOURNEY_SUB_RECEIVED';
export const PASSENGER_CONFIRM_PICKUP_ALERT: string = 'PASSENGER_CONFIRM_PICKUP_ALERT';

// Passenger Journeys
export const GET_ALL_JOURNEYS_REQUEST: string = 'GET_ALL_JOURNEYS_REQUEST';
export const GET_ALL_JOURNEYS_SUCCESS: string = 'GET_ALL_JOURNEYS_SUCCESS';
export const GET_ALL_JOURNEYS_FAILURE: string = 'GET_ALL_JOURNEYS_FAILURE';
export const SEARCH_JOURNEYS_REQUEST: string = 'SEARCH_JOURNEYS_REQUEST';
export const SEARCH_JOURNEYS_SUCCESS: string = 'SEARCH_JOURNEYS_SUCCESS';
export const SEARCH_JOURNEYS_FAILURE: string = 'SEARCH_JOURNEYS_FAILURE';
export const CLEAR_ALL_JOURNEYS: string = 'CLEAR_ALL_JOURNEYS';
export const GET_VIEW_JOURNEY_REQUEST: string = 'GET_VIEW_JOURNEY_REQUEST';
export const GET_VIEW_JOURNEY_SUCCESS: string = 'GET_VIEW_JOURNEY_SUCCESS';
export const GET_VIEW_JOURNEY_FAILURE: string = 'GET_VIEW_JOURNEY_FAILURE';
export const UPDATE_ADD_USER_JOURNEY_REQUEST: string = 'UPDATE_ADD_USER_JOURNEY_REQUEST';
export const UPDATE_ADD_USER_JOURNEY_SUCCESS: string = 'UPDATE_ADD_USER_JOURNEY_SUCCESS';
export const UPDATE_ADD_USER_JOURNEY_FAILURE: string = 'UPDATE_ADD_USER_JOURNEY_FAILURE';
export const CANCEL_LIFT_ACCEPTANCE_REQUEST: string = 'CANCEL_LIFT_ACCEPTANCE_REQUEST';
export const CANCEL_LIFT_ACCEPTANCE_SUCCESS: string = 'CANCEL_LIFT_ACCEPTANCE_SUCCESS';
export const CANCEL_LIFT_ACCEPTANCE_FAILURE: string = 'CANCEL_LIFT_ACCEPTANCE_FAILURE';
export const CLEAR_VIEW_JOURNEY_INFO: string = 'CLEAR_VIEW_JOURNEY_INFO';

// Admin Driver Applications (WebSockets Demo)
export const STORE_APPLICATIONS: string = 'STORE_APPLICATIONS';

// User Profile
export const USER_PROFILE_REQUEST: string = 'USER_PROFILE_REQUEST';
export const USER_PROFILE_RECEIVED: string = 'USER_PROFILE_RECEIVED';
export const USER_PROFILE_FAILURE: string = 'USER_PROFILE_FAILURE';
export const USER_PROFILE_UNSUB: string = 'USER_PROFILE_UNSUB';
export const UPLOAD_AVATAR_REQUEST: string = 'UPLOAD_AVATAR_REQUEST';
export const UPLOAD_AVATAR_SUCCESS: string = 'UPLOAD_AVATAR_SUCCESS';
export const UPLOAD_AVATAR_FAILURE: string = 'UPLOAD_AVATAR_FAILURE';
export const UPDATE_INTERESTS_REQUEST: string = 'UPDATE_INTERESTS_REQUEST';
export const UPDATE_INTERESTS_SUCCESS: string = 'UPDATE_INTERESTS_SUCCESS';
export const UPDATE_INTERESTS_FAILURE: string = 'UPDATE_INTERESTS_FAILURE';

// Interests
export const INTERESTS_REQUEST: string = 'INTERESTS_REQUEST';
export const INTERESTS_SUCCESS: string = 'INTERESTS_SUCCESS';
export const INTERESTS_FAILURE: string = 'INTERESTS_FAILURE';

// Chats
export const GET_CHAT_REQUEST: string = 'GET_CHAT_REQUEST';
export const GET_CHAT_SUCCESS: string = 'GET_CHAT_SUCCESS';
export const GET_CHAT_FAILURE: string = 'GET_CHAT_FAILURE';
export const GET_ALL_CHATS_REQUEST: string = 'GET_ALL_CHATS_REQUEST';
export const GET_ALL_CHATS_SUCCESS: string = 'GET_ALL_CHATS_SUCCESS';
export const GET_ALL_CHATS_FAILURE: string = 'GET_ALL_CHATS_FAILURE';
export const UPDATED_CHAT_SUB: string = 'UPDATED_CHAT_SUB';

// Messages
export const GET_CHAT_MESSAGES_REQUEST: string = 'GET_CHAT_MESSAGES_REQUEST';
export const GET_CHAT_MESSAGES_SUCCESS: string = 'GET_CHAT_MESSAGES_SUCCESS';
export const GET_CHAT_MESSAGES_FAILURE: string = 'GET_CHAT_MESSAGES_FAILURE';
export const SEND_MESSAGE_REQUEST: string = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS: string = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE: string = 'SEND_MESSAGE_FAILURE';
export const NEW_CHAT_SUB_MESSAGES: string = 'NEW_CHAT_SUB_MESSAGES';

// Driver Applications
export const DRIVER_APPLICATION_REQUEST: string = 'DRIVER_APPLICATION_REQUEST';
export const DRIVER_APPLICATION_SUCCESS: string = 'DRIVER_APPLICATION_SUCCESS';
export const DRIVER_APPLICATION_FAILURE: string = 'DRIVER_APPLICATION_FAILURE';
export const APPLICATION_ALREADY_APPLIED: string = 'APPLICATION_ALREADY_APPLIED';

// Vehicle Models and Makes
export const VEHICLE_MAKES_REQUEST: string = 'VEHICLE_MAKES_REQUEST';
export const VEHICLE_MAKES_SUCCESS: string = 'VEHICLE_MAKES_SUCCESS';
export const VEHICLE_MAKES_FAILURE: string = 'VEHICLE_MAKES_FAILURE';
export const VEHICLE_MODELS_REQUEST: string = 'VEHICLE_MAKES_REQUEST';
export const VEHICLE_MODELS_SUCCESS: string = 'VEHICLE_MODELS_SUCCESS';
export const VEHICLE_MODELS_FAILURE: string = 'VEHICLE_MODELS_FAILURE';

// Update User
export const UPDATE_USER_REQUEST: string = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS: string = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE: string = 'UPDATE_USER_FAILURE';

// Update Password
export const UPDATE_PASSWORD_REQUEST: string = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS: string = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE: string = 'UPDATE_PASSWORD_FAILURE';

// Update Email
export const UPDATE_EMAIL_REQUEST: string = 'UPDATE_EMAIL_REQUEST';
export const UPDATE_EMAIL_SUCCESS: string = 'UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_FAILURE: string = 'UPDATE_EMAIL_FAILURE';

// Journeys
export const JOURNEYS_REQUEST: string = 'JOURNEYS_REQUEST';
export const JOURNEYS_SUCCESS: string = 'JOURNEYS_SUCCESS';
export const JOURNEYS_FAILURE: string = 'JOURNEYS_FAILURE';

// Cancel Passenger Accepted Journeys
export const CANCEL_PASSENGER_JOURNEY_REQUEST: string = 'CANCEL_PASSENGER_JOURNEY_REQUEST';
export const CANCEL_PASSENGER_JOURNEY_SUCCESS: string = 'CANCEL_PASSENGER_JOURNEY_SUCCESS';
export const CANCEL_PASSENGER_JOURNEY_FAILURE: string = 'CANCEL_PASSENGER_JOURNEY_FAILURE';

// Driver Journey
export const JOURNEY_DETAILS_REQUEST: string = 'JOURNEY_DETAILS_REQUEST';
export const JOURNEY_DETAILS_SUCCESS: string = 'JOURNEY_DETAILS_SUCCESS';
export const JOURNEY_DETAILS_FAILURE: string = 'JOURNEY_DETAILS_FAILURE';

// Passenger Journey
export const PASSENGER_JOURNEY_DETAILS_REQUEST: string = 'PASSENGER_JOURNEY_DETAILS_REQUEST';
export const PASSENGER_JOURNEY_DETAILS_SUCCESS: string = 'PASSENGER_JOURNEY_DETAILS_SUCCESS';
export const PASSENGER_JOURNEY_DETAILS_FAILURE: string = 'PASSENGER_JOURNEY_DETAILS_FAILURE';
export const UPDATE_DRIVER_LOCATION: string = 'UPDATE_DRIVER_LOCATION';

// Driver -> Passenger Pickup
export const PASSENGER_PICKUP_JOURNEY_REQUEST: string = 'PASSENGER_PICKUP_JOURNEY_REQUEST';
export const PASSENGER_PICKUP_JOURNEY_SUCCESS: string = 'PASSENGER_PICKUP_JOURNEY_SUCCESS';
export const PASSENGER_PICKUP_JOURNEY_FAILURE: string = 'PASSENGER_PICKUP_JOURNEY_FAILURE';
export const DRIVER_CONFIRM_PASSENGER_PICKUP_REQUEST: string = 'DRIVER_CONFIRM_PASSENGER_PICKUP_REQUEST';
export const DRIVER_CONFIRM_PASSENGER_PICKUP_SUCCESS: string = 'DRIVER_CONFIRM_PASSENGER_PICKUP_SUCCESS';
export const DRIVER_CONFIRM_PASSENGER_PICKUP_FAILURE: string = 'DRIVER_CONFIRM_PASSENGER_PICKUP_FAILURE';
export const DRIVER_CANCEL_PASSENGER_PICKUP_REQUEST: string = 'DRIVER_CANCEL_PASSENGER_PICKUP_REQUEST';
export const DRIVER_CANCEL_PASSENGER_PICKUP_SUCCESS: string = 'DRIVER_CANCEL_PASSENGER_PICKUP_SUCCESS';
export const DRIVER_CANCEL_PASSENGER_PICKUP_FAILURE: string = 'DRIVER_CANCEL_PASSENGER_PICKUP_FAILURE';

// Passenger Pickup Confirm / Cancel
export const PASSENGER_CONFIRM_PICKUP_REQUEST: string = 'PASSENGER_CONFIRM_PICKUP_REQUEST';
export const PASSENGER_CONFIRM_PICKUP_SUCCESS: string = 'PASSENGER_CONFIRM_PICKUP_SUCCESS';
export const PASSENGER_CONFIRM_PICKUP_FAILURE: string = 'PASSENGER_CONFIRM_PICKUP_FAILURE';
export const PASSENGER_CANCEL_PICKUP_REQUEST: string = 'PASSENGER_CANCEL_PICKUP_REQUEST';
export const PASSENGER_CANCEL_PICKUP_SUCCESS: string = 'PASSENGER_CANCEL_PICKUP_SUCCESS';
export const PASSENGER_CANCEL_PICKUP_FAILURE: string = 'PASSENGER_CANCEL_PICKUP_FAILURE';

// General Journey Actions
export const CANCEL_JOURNEY_REQUEST: string = 'CANCEL_JOURNEY_REQUEST';
export const CANCEL_JOURNEY_SUCCESS: string = 'CANCEL_JOURNEY_SUCCESS';
export const CANCEL_JOURNEY_FAILURE: string = 'CANCEL_JOURNEY_FAILURE';

// Begin Journey Pickup
export const BEGIN_PICKUP_REQUEST: string = 'BEGIN_PICKUP_REQUEST';
export const BEGIN_PICKUP_SUCCESS: string = 'BEGIN_PICKUP_SUCCESS';
export const BEGIN_PICKUP_FAILURE: string = 'BEGIN_PICKUP_FAILURE';

// Start Journey
export const START_JOURNEY_REQUEST: string = 'START_JOURNEY_REQUEST';
export const START_JOURNEY_SUCCESS: string = 'START_JOURNEY_SUCCESS';
export const START_JOURNEY_FAILURE: string = 'START_JOURNEY_FAILURE';

// Pause Journey
export const PAUSE_JOURNEY_REQUEST: string = 'PAUSE_JOURNEY_REQUEST';
export const PAUSE_JOURNEY_SUCCESS: string = 'PAUSE_JOURNEY_SUCCESS';
export const PAUSE_JOURNEY_FAILURE: string = 'PAUSE_JOURNEY_FAILURE';

// Pause Journey
export const RESUME_JOURNEY_REQUEST: string = 'RESUME_JOURNEY_REQUEST';
export const RESUME_JOURNEY_SUCCESS: string = 'RESUME_JOURNEY_SUCCESS';
export const RESUME_JOURNEY_FAILURE: string = 'RESUME_JOURNEY_FAILURE';

// End Journey
export const END_JOURNEY_REQUEST: string = 'END_JOURNEY_REQUEST';
export const END_JOURNEY_SUCCESS: string = 'END_JOURNEY_SUCCESS';
export const END_JOURNEY_FAILURE: string = 'END_JOURNEY_FAILURE';

// Driver Movement
export const DRIVER_MOVEMENT_REQUEST: string = 'DRIVER_MOVEMENT_REQUEST';
export const DRIVER_MOVEMENT_SUCCESS: string = 'DRIVER_MOVEMENT_SUCCESS';
export const DRIVER_MOVEMENT_FAILURE: string = 'DRIVER_MOVEMENT_FAILURE';

// Google Places Search
export const GOOGLE_PLACES_SEARCH_REQUEST: string = 'GOOGLE_PLACES_SEARCH_REQUEST';
export const GOOGLE_PLACES_SEARCH_SUCCESS: string = 'GOOGLE_PLACES_SEARCH_SUCCESS';
export const GOOGLE_PLACES_SEARCH_FAILURE: string = 'GOOGLE_PLACES_SEARCH_FAILURE';
export const GOOGLE_PLACES_SEARCH_CLEAR_RESULTS: string = 'GOOGLE_PLACES_SEARCH_CLEAR_RESULTS';
export const SELECT_GOOGLE_PLACE: string = 'SELECT_GOOGLE_PLACE';

// Google Places Details
export const GOOGLE_PLACES_DETAILS_REQUEST: string = 'GOOGLE_PLACES_DETAILS_REQUEST';
export const GOOGLE_PLACES_DETAILS_SUCCESS: string = 'GOOGLE_PLACES_DETAILS_SUCCESS';
export const GOOGLE_PLACES_DETAILS_FAILURE: string = 'GOOGLE_PLACES_DETAILS_FAILURE';

// Create Journey
export const CREATE_JOURNEY_REQUEST: string = 'CREATE_JOURNEY_REQUEST';
export const CREATE_JOURNEY_SUCCESS: string = 'CREATE_JOURNEY_SUCCESS';
export const CREATE_JOURNEY_FAILURE: string = 'CREATE_JOURNEY_FAILURE';
export const CREATE_JOURNEY_DROP_MARKER: string = 'CREATE_JOURNEY_DROP_MARKER';
export const CLEAR_NEW_JOURNEY_FORM_DETAILS: string = 'CLEAR_NEW_JOURNEY_FORM_DETAILS';

// Find Nearby Place
export const FIND_NEARBY_PLACE_REQUEST: string = 'FIND_NEARBY_PLACE_REQUEST';
export const FIND_NEARBY_PLACE_SUCCESS: string = 'FIND_NEARBY_PLACE_SUCCESS';
export const FIND_NEARBY_PLACE_FAILURE: string = 'FIND_NEARBY_PLACE_FAILURE';

// Create Route
export const CREATE_JOURNEY_FIND_ROUTE_REQUEST: string = 'CREATE_JOURNEY_FIND_ROUTE_REQUEST';
export const CREATE_JOURNEY_FIND_ROUTE_SUCCESS: string = 'CREATE_JOURNEY_FIND_ROUTE_SUCCESS';
export const CREATE_JOURNEY_FIND_ROUTE_FAILURE: string = 'CREATE_JOURNEY_FIND_ROUTE_FAILURE';

// Theme
export const TURN_ON_DARK_MODE: string = 'TURN_ON_DARK_MODE';
export const TURN_OFF_DARK_MODE: string = 'TURN_OFF_DARK_MODE';
