import { SIGNUP, LOGIN, SEND_MESSAGE } from '../constants/websocket-actions';

class WebSocketAPI {
	private WS: WebSocket = new WebSocket('wss://29djb951zd.execute-api.eu-west-1.amazonaws.com/dev');

	constructor() {
		this.setup();
	}

	private setup = (): void => {
		this.WS.onopen = (): void => {
			this.sendMessage('Connected');
		};

		this.WS.onmessage = (e: object): void => {
			// a message was received
			// @ts-ignore
			console.log(e.data);
		};

		this.WS.onerror = (e: object): void => {
			// an error occurred
			// @ts-ignore
			console.log(e.message);
		};

		this.WS.onclose = (e: object): void => {
			// connection closed
			// @ts-ignore
			console.log(e.code, e.reason);
		};
	}

	public sendMessage = (data: string): void => {
		this.WS.send(JSON.stringify({
			action: SEND_MESSAGE,
			data
		}));
	}

	public login = (data: object): void => {
		this.WS.send(JSON.stringify({
			action: LOGIN,
			data
		}));
	}

	public signup = (data: object): void => {
		this.WS.send(JSON.stringify({
			action: SIGNUP,
			data
		}));
	}

}

const WS = new WebSocketAPI();

export default WS;
