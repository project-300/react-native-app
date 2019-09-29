export type AWS_CONFIG_TYPE = {
	identityPoolId: string;
	region: string;
	userPoolId: string;
	userPoolWebClientId: string;
};

export interface S3_CONFIG_TYPE_BRIEF {
	bucket: string;
	region: string;
	accessKey: string;
}

export interface S3_CONFIG_TYPE extends S3_CONFIG_TYPE_BRIEF {
	keyPrefix: string;
	secretKey: string;
	successActionStatus: number;
}
