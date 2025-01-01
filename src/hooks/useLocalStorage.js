import { useEffect, useState } from 'react';
function useLocalStorage(intialState, key) {
	// local storage
	const [value, setValue] = useState(function () {
		try {
			const storedValue = localStorage.getItem(key);
			console.log(storedValue);
			return storedValue ? JSON.parse(storedValue) : intialState;
		} catch (err) {
			console.error(err);
		}
	});

	// update local storage
	useEffect(
		function () {
			if (key) localStorage.setItem(key, JSON.stringify(value));
		},
		[value, key]
	);
	return [value, setValue];
}

export { useLocalStorage };
