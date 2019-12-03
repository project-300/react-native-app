import { AWS_COGNITO_CONFIG_TYPE, S3_CONFIG_TYPE_BRIEF } from '../src/types/aws';

export const IS_OFFLINE: boolean = false;

export const SERVER_HTTPS_URL: string = IS_OFFLINE ?
	'{{ OFFLINE_SERVER_HTTPS_URL }}' :
	'{{ LIVE_SERVER_HTTPS_URL }}'; 	// AWS Lambda HTTPS Stage URL

export const SERVER_WSS_URL: string = IS_OFFLINE ?
	'{{ OFFLINE_SERVER_WSS_URL }}' :
	'{{ LIVE_SERVER_WSS_URL }}';		// AWS Lambda WSS Stage URL

export const AWS_CONFIG: AWS_COGNITO_CONFIG_TYPE = {
	identityPoolId: '{{ IDENTITY_POOL_ID }}',						// AWS Cognito Identity Pool ID
	region: '{{ REGION }}',											// AWS Region
	userPoolId: '{{ USER_POOL_ID }}',								// AWS Cognito User Pool ID
	userPoolWebClientId: '{{ USER_POOL_WEB_CLIENT_ID }}'			// AWS Cognito Client ID
};

export const S3_CONFIG: S3_CONFIG_TYPE_BRIEF = {
	bucket: '{{ BUCKET }}',											// AWS S3 Bucket Name
	region: '{{ REGION }}',											// AWS S3 Bucket Region
	accessKey: '{{ ACCESS_KEY }}'									// AWS S3 Bucket Client Access Key
};

export const GoogleMapsAPIKey: string = '{{ API_KEY }}';
