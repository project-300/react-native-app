import { GET_APPLICATIONS } from '../constants/websocket-actions';
import { SERVER_WSS_URL } from '../../environment/env';

class WebSocketAPI {
	private WS: WebSocket = new WebSocket(SERVER_WSS_URL);

	public constructor() {
		this.setup();
	}

	private setup = (): void => {
		this.WS.onopen = (): void => {
			console.log('Connected');
		};

		this.WS.onmessage = (e: object): void => {
			// a message was received
			console.log(e.data);
		};

		this.WS.onerror = (e: object): void => {
			// an error occurred
			console.log(e.message);
		};

		this.WS.onclose = (e: object): void => {
			// connection closed
			console.log(e.code, e.reason);
		};
	}

	public getApplications = (subscribe: boolean): void => {
		this.WS.send(JSON.stringify({
			action: GET_APPLICATIONS,
			subscription: 'admin/driver-applications',
			subscribe
		}));
	}

}

const WS = new WebSocketAPI();

export default WS;
