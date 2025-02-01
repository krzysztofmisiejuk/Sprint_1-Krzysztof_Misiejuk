interface Dict<T> {
	[k: string]: T;
}

const cars = {
	modelS: { brand: 'Tesla', color: 'white', price: 79999 },
	corolla: { brand: 'Toyota', color: 'silver', price: 20000 },
	mustang: { brand: 'Ford', color: 'red', price: 45000 },
	civic: { brand: 'Honda', color: 'blue', price: 22000 },
	model3: { brand: 'Tesla', color: 'black', price: 39999 },
	beetle: { brand: 'Volkswagen', color: 'yellow', price: 18000 },
};

const students = {
	alice: { age: 20, major: 'Computer Science', gpa: 3.8 },
	bob: { age: 19, major: 'Mathematics', gpa: 3.2 },
	charlie: { age: 21, major: 'History', gpa: 3.5 },
	diana: { age: 22, major: 'Biology', gpa: 3.9 },
	eric: { age: 20, major: 'Psychology', gpa: 3.6 },
	fiona: { age: 19, major: 'Literature', gpa: 3.4 },
};

function mapDict<T>(obj: Dict<T>, callback: (value: T) => T): Dict<T> {
	const newObj = Object.entries(obj).map(([key, value]) => {
		const newValue = { ...value };
		return [key, callback(newValue)];
	});
	return Object.fromEntries(newObj);
}

const mappedDict = mapDict(students, (item) => ({
	...item,
	age: (item.age += 99),
}));

function filterDict<T>(obj: Dict<T>, callback: (value: T) => boolean): Dict<T> {
	const arr = Object.entries(obj).filter((entries) => callback(entries[1]), 0);
	const newObj = Object.fromEntries(arr);
	return newObj;
}

const resultFilter = filterDict(cars, (value) => value.price > 40000);

function reducDict<T>(
	obj: Dict<T>,
	callback: (acc: number, value: T) => { [k: string]: number }
): Dict<T> {
	const newObj = Object.entries(obj).reduce((acc, [key, value]) => {
		acc[key] = callback(acc[key], value);
		return acc;
	}, {});

	return newObj;
}

const reducedDict = reducDict(students, (acc, nextValue) => {
	const value = nextValue.major;
	return {
		[`${value} length`]: acc
			? acc + JSON.stringify(value).length
			: JSON.stringify(value).length,
	};
});
