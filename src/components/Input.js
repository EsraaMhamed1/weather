import { useRef } from 'react';
import { useKey } from '../hooks/useKey';

export default function Input({ location, setLocation }) {
	const inputEl = useRef(null);

	useKey('enter', function () {
		if (document.activeElement === inputEl.current) return;
		inputEl.current.focus();
		setLocation('');
	});
	return (
		<input
			type='text'
			placeholder='search from location...'
			value={location}
			onChange={(e) => setLocation(e.target.value)}
			ref={inputEl}
		/>
	);
}
