export interface ImagePickerResponse {
	customButton: string;
	didCancel: boolean;
	error: string;
	data: string;
	uri: string;
	origURL?: string;
	isVertical: boolean;
	width: number;
	height: number;
	fileSize: number;
	type?: string;
	fileName?: string;
	path?: string;
	latitude?: number;
	longitude?: number;
	timestamp?: string;
}
