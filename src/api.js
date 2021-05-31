import { OWAPPID } from './constans'

const fetcher = async (url, error = 'Not Found') => {
	const response = await fetch(url)

	if (!response.ok) {
		const json = await response.json()
		throw json.message || error
	}

	return await response.json()
}

export const getWeather = async param => {
	const url = `http://api.openweathermap.org/data/2.5/weather?appid=${OWAPPID}&${param}&units=metric&lang=sp`
	const error = 'OpenWeather not found'
	return fetcher(url, error)
}

export const getForecastWeather = async (lat, lon) => {
	const url = `https://api.openweathermap.org/data/2.5/onecall?appid=${OWAPPID}&units=metric&lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&units=metric&lang=sp`
	const error = 'OpenWeather not found'
	return fetcher(url, error)
}

export const getPositionByIp = async () => {
	const url = 'http://ip-api.com/json/'
	const error = 'IpApi not found'
	return fetcher(url, error)
}
