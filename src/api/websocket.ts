import { SERVER_WSS_URL } from '../../environment/env';
import { store } from '../store';
import { updateDriverLocation, newChatMessages } from '../redux/actions';
import { userId } from '../auth';
import { JOURNEY_DRIVER_LOCATION } from '../constants/websocket-subscriptions';
import { SubscriptionPayload } from '@project-300/common-types';
import { Auth } from 'aws-amplify';
import { AsyncStorage } from 'react-native';
import { deviceId } from '../app';

export const updateConnectionId = async (connectionId: string): Promise<void> => {
	await AsyncStorage.setItem('Websocket-Connection-ID', connectionId);
};

export const connectionId = async (): Promise<string | null> => AsyncStorage.getItem('Websocket-Connection-ID');

class WebSocketAPI {

	private WS: WebSocket = new WebSocket(SERVER_WSS_URL);

	public constructor() {
		this._setup();
	}

	public _setup = (reconnect?: boolean): void => {
		this.WS.onopen = async (): Promise<void> => {
			console.log('Connected');

			await this.updateConnection(!!reconnect);
		};

		this.WS.onmessage = async (ev: MessageEvent): Promise<void> => {
			console.log(ev);
			const data: SubscriptionPayload = JSON.parse(ev.data);
			if (data && data.subscription) await this._dispatchSubscriptionData(data);
		};

		this.WS.onerror = (ev: Event): void => {
			console.log('Websocket Error', ev);
		};

		this.WS.onclose = (ev: CloseEvent): void => {
			console.log(ev.code, ev.reason);

			if (ev.code === 1001) { // Connection dropped - Recreate connection
				this.WS =  new WebSocket(SERVER_WSS_URL);
				this._setup(true);
			}
		};
	}

		// append can be used as an extra detail for filtering subscriptions, eg. object id
	public subscribe = async (subscription: string, append?: string): Promise<void> => {
		this.WS.send(JSON.stringify({
			action: subscription,
			subscription: append ? `${subscription}/#${append}` : subscription,
			userId: await userId(),
			subscribe: true
		}));
	}

	public unsubscribe = async (subscription: string, append?: string): Promise<void> => {
		this.WS.send(JSON.stringify({
			action: subscription,
			subscription: append ? `${subscription}/#${append}` : subscription,
			userId: await userId(),
			subscribe: false
		}));
	}

	public updateConnection = async (reconnect: boolean): Promise<void> => {
		const user: any = await Auth.currentUserInfo();
		if (!user) return;

		this.WS.send(JSON.stringify({
			action: 'updateConnection',
			userId: user.attributes.sub,
			deviceId: await deviceId(),
			oldConnection: reconnect ? await connectionId() : undefined
		}));
	}

	private _dispatchSubscriptionData = async (payload: SubscriptionPayload): Promise<void> => {
		let { subscription } = payload;

		if (payload.subscription === 'connectionUpdated') await updateConnectionId(payload.connectionId);

		console.log(subscription);
		if (subscription && subscription.indexOf('/#')) subscription = subscription.split('/#')[0];
		console.log(subscription);
		console.log(payload);

		switch (subscription) {
			case JOURNEY_DRIVER_LOCATION:
				store.dispatch(updateDriverLocation(payload));
				break;
			case 'chat/messages':
				const userId: string = (await Auth.currentUserInfo()).attributes.sub;

				store.dispatch(newChatMessages(payload, userId));
				break;
			default:
				return;
		}
	}

}

const WS = new WebSocketAPI();

export default WS;
