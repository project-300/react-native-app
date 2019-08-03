export const SERVER_HTTPS_URL: string = '{{ SERVER_HTTPS_URL }}'; 	// AWS Lambda HTTPS stage URL
export const SERVER_WSS_URL: string = '{{ SERVER_WSS_URL }}';		// AWS Lambda WSS stage URL

export const AWS_CONFIG: object = {
	identityPoolId: '{{ IDENTITY_POOL_ID }}',						// AWS Cognito Identity Pool ID
	region: '{{ REGION }}',											// AWS Region
	userPoolId: '{{ USER_POOL_ID }}',								// AWS Cognito User Pool ID
	userPoolWebClientId: '{{ USER_POOL_WEB_CLIENT_ID }}'			// AWS Cognito Client ID
};
