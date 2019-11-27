import { SERVER_WSS_URL } from '../../environment/env';
import { store } from '../store';
import { storeApplications, userProfileSubReceived, userProfileSubFailure } from '../redux/actions';
import { userId } from '../auth';
import { ADMIN_DRIVER_APPLICATIONS, USER_PROFILE } from '../constants/websocket-subscriptions';
import { SubscriptionPayload } from '@project-300/common-types';

class WebSocketAPI {

	private WS: WebSocket = new WebSocket(SERVER_WSS_URL);

	public constructor() {
		this._setup();
	}

	private _setup = (): void => {
		this.WS.onopen = (): void => {
			console.log('Connected');
		};

		this.WS.onmessage = (ev: MessageEvent): void => {
			console.log(ev);
			const data: SubscriptionPayload = JSON.parse(ev.data);
			if (data && data.subscription) this._dispatchSubscriptionData(data);
		};

		this.WS.onerror = (ev: Event): void => {
			console.log('Websocket Error', ev);
		};

		this.WS.onclose = (ev: CloseEvent): void => {
			console.log(ev.code, ev.reason);
		};
	}

	public subscribe = async (subscription: string): Promise<void> => {
		this.WS.send(JSON.stringify({
			action: subscription,
			subscription,
			userId: await userId(),
			subscribe: true
		}));
	}

	public unsubscribe = async (subscription: string): Promise<void> => {
		this.WS.send(JSON.stringify({
			action: subscription,
			subscription,
			userId: await userId(),
			subscribe: false
		}));
	}

	private _dispatchSubscriptionData = (payload: SubscriptionPayload): void => {
		const { subscription } = payload;

		switch (subscription) {
			case ADMIN_DRIVER_APPLICATIONS:
				store.dispatch(storeApplications(payload));
				break;
			case USER_PROFILE:
				if (payload.error) store.dispatch(userProfileSubFailure(payload));
				else store.dispatch(userProfileSubReceived(payload));
				break;
			default:
				return;
		}
	}

}

const WS = new WebSocketAPI();

export default WS;
