import Day from './Day';

export default function Weather({ weather, location }) {
	if (!weather || !weather.time) {
		return <p>No data available</p>;
	}

	const {
		temperature_2m_max: max,
		temperature_2m_min: min,
		weathercode: codes,
		time: dates,
	} = weather;

	return (
		<div>
			<h2 className='small-title'>Weather in {location}</h2>
			<ul className='weather'>
				{dates.map((date, i) => (
					<Day
						key={date}
						date={date}
						max={max[i]}
						min={min[i]}
						code={codes[i]}
						isToday={i === 0}
					/>
				))}
			</ul>
		</div>
	);
}
