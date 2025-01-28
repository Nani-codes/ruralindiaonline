export const get = (object: any, path: string, defaultValue: any = undefined) => {
	const keys = Array.isArray(path) ? path : path.split('.');

	for (const key of keys) {
		if (object === null || typeof object !== 'object' || !(key in object)) {
			return defaultValue;
		}
		object = object[key];
	}

	return object;
};

export const map = (collection: any[], iteratee: any) => {
	if (Array.isArray(collection)) {
		return collection.map(iteratee);
	}

	if (typeof collection === 'object' && collection !== null) {
		return Object.keys(collection).map((key) => iteratee(collection[key], key));
	}

	return [];
};
