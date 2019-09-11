import _ from 'lodash';

export interface SubscriptionPayload {
	subscription: string;
	type: PublishType;
	isCollection: boolean;
	objectId: string;
	data: CollectionItem | CollectionItem[] | string;
}

export interface CollectionItem {
	[id: string]: string;
}

enum PublishType {
	QUERY = 'QUERY',
	INSERT = 'INSERT',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE'
}

class SubscriptionReceiver {

	public updateCollection = (payload: SubscriptionPayload, collection: CollectionItem[]): CollectionItem[] => {
		const { type, isCollection, objectId, data } = payload;
		let updatedCollection: CollectionItem[] = collection;

		if (isCollection && data instanceof Array) {
			if (type === PublishType.QUERY) updatedCollection = this._removeMissingItems(collection, data, objectId);

			data.map((item: CollectionItem) => {
				updatedCollection = this.mapItemToCollection(type, objectId, item, updatedCollection);
			});
		} else {
			updatedCollection = this.mapItemToCollection(type, objectId, data, updatedCollection);
		}

		return updatedCollection;
	}

	private _removeMissingItems = (collection: CollectionItem[], newCollection: CollectionItem[], id: string): CollectionItem[] => {
		return _.reject(collection, (item: CollectionItem) => !_.find(newCollection, { [id]: item[id] }));
	}

	private mapItemToCollection = (
		type: PublishType,
		id: string,
		item: CollectionItem[] | CollectionItem | string,
		collection: CollectionItem[]
	): CollectionItem[] => {
		if (!id || !item) return collection;

		switch (type) {
			case PublishType.QUERY:
				return this._queryResult(id, item as CollectionItem, collection);
			case PublishType.INSERT:
				return this._insertResult(id, item as CollectionItem, collection);
			case PublishType.UPDATE:
				return this._updateResult(id, item as CollectionItem, collection);
			case PublishType.DELETE:
				return this._deleteResult(id, item as string, collection);
			default:
				return collection;
		}
	}

	private _queryResult = (id: string, item: CollectionItem, collection: CollectionItem[]): CollectionItem[] => {
		if (!collection.find((colItem: CollectionItem) => colItem[id] === item[id])) collection.push(item);
		return collection;
	}

	private _insertResult = (id: string, item: CollectionItem, collection: CollectionItem[]): CollectionItem[] => {
		if (!collection.find((colItem: CollectionItem) => colItem[id] === item[id])) collection.push(item);
		return collection;
	}

	private _updateResult = (id: string, item: CollectionItem, collection: CollectionItem[]): CollectionItem[] => {
		const existingItemIndex: number = collection.findIndex((colItem: CollectionItem) => colItem[id] === item[id]);
		if (existingItemIndex > -1) collection[existingItemIndex] = item;
		return collection;
	}

	private _deleteResult = (id: string, item: string, collection: CollectionItem[]): CollectionItem[] => {
		const existingItemIndex: number = collection.findIndex((colItem: CollectionItem) => colItem[id] === item);
		if (existingItemIndex > -1) collection.splice(existingItemIndex, 1);
		return collection;
	}

}

const SubReceiver: SubscriptionReceiver = new SubscriptionReceiver();

export default SubReceiver;
