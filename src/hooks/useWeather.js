import { useState, useEffect, useCallback } from 'react';

function convertToFlag(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function useWeather(location) {
	const [isLoading, setIsLoading] = useState(false);
	const [displayLocation, setDisplayLocation] = useState('');
	const [weather, setWeather] = useState({}, 'location');

	const fetchWeather = useCallback(async () => {
		if (location.length < 2) return setWeather({});

		try {
			setIsLoading(true);
			// get location
			const geoRes = await fetch(
				`https://geocoding-api.open-meteo.com/v1/search?name=${location}`
			);
			const geoData = await geoRes.json();
			// console.log(geoData);

			if (!geoData.results) throw new Error('Location not found');

			const { latitude, longitude, timezone, name, country_code } =
				geoData.results.at(0);

			setDisplayLocation(`${name} ${convertToFlag(country_code)} `);

			// getting actual weather
			const weatherRes = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
			);
			const weatherData = await weatherRes.json();
			setWeather(weatherData.daily);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}, [location]);

	useEffect(() => {
		if (location) {
			fetchWeather();
		}
	}, [fetchWeather, location]);
	return { isLoading, displayLocation, weather };
}

export { useWeather };
