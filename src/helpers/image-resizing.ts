/*
* Function to reduce an image size
* If the image is landscape, the width is set to the maxSize. The height is reduced to scale.
* If the image is portrait, the height is set to the maxSize. The width is reduced to scale.
* */

// tslint:disable-next-line:ban-ts-ignore
// @ts-ignore
import { Response as ImageResponse } from 'react-native-image-picker';
import ImageResizer, { Response as ResizedResponse } from 'react-native-image-resizer';

export const ReduceImage = async (img: ImageResponse, maxSize: number): Promise<ResizedResponse> => {
	const currentWidth: number = img.width;
	const currentHeight: number = img.height;
	let newWidth: number = currentWidth;
	let newHeight: number = currentHeight;

	if (currentWidth > currentHeight && currentWidth > maxSize) { // Landscape
		newWidth = maxSize;
		newHeight = (currentHeight / currentWidth) * newWidth;
	} else if (currentHeight > currentWidth && currentHeight > maxSize) { // Portrait
		newHeight = maxSize;
		newWidth = (currentWidth / currentHeight) * newHeight;
	}

	const rs: ResizedResponse = await ImageResizer.createResizedImage(img.uri, newWidth, newHeight, 'JPEG', 100);

	return rs;
};
