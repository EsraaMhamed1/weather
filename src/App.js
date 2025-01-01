import Weather from './components/Weather';
import Input from './components/Input';
import { useWeather } from './hooks/useWeather';
import { useLocalStorage } from './hooks/useLocalStorage';

const App = () => {
	const [location, setLocation] = useLocalStorage([], 'location');
	const { isLoading, weather, displayLocation } = useWeather(location);

	// useEffect(function () {
	// 	const savedLoaction = localStorage.getItem('location') || '';
	// 	setLocation(savedLoaction);
	// 	fetchWeather(savedLoaction);
	// }, []);

	// useEffect(
	// 	function () {
	// 		if (location) {
	// 			fetchWeather();
	// 		}
	// 	},
	// 	[location]
	// );

	return (
		<div className='app'>
			<h1>Seven Days Weather</h1>
			<Input location={location} setLocation={setLocation} />
			{isLoading && <p className='loder'>Loading...</p>}

			{weather.weathercode && (
				<Weather weather={weather} location={displayLocation} />
			)}
		</div>
	);
};

export default App;
