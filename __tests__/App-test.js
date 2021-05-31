// import 'react-native'
// import React from 'react'
// import App from '../App'
// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer'

import SagaTester from 'redux-saga-tester'
import reducers from '../src/redux/reducers'
import {
	watchGetForecastWeather,
	watchGetGeolocation,
	watchGetGeolocationSuccess,
	watchSearchCity,
	watchUpdateWeather
} from '../src/redux/sagas'
import {
	getForecastWeather,
	getForecastWeatherSuccess,
	getGeolocation,
	getGeolocationSuccess,
	getWeatherByGeolocationSuccess,
	removeCityById,
	searchCity,
	searchCitySuccess,
	updateWeather,
	updateWeatherSuccess
} from '../src/redux/actions'
import * as api from '../src/api'

const mockedGeolocation = {
	query: '190.191.6.249',
	status: 'success',
	continent: 'South America',
	continentCode: 'SA',
	country: 'Argentina',
	countryCode: 'AR',
	region: 'B',
	regionName: 'Buenos Aires',
	city: 'Mar del Plata',
	district: '',
	zip: '7600',
	lat: -37.9951,
	lon: -57.541,
	timezone: 'America/Argentina/Buenos_Aires',
	offset: -10800,
	currency: 'ARS',
	isp: 'Telecom Argentina S.A.',
	org: 'Telecom Argentina S.A',
	as: 'AS7303 Telecom Argentina S.A.',
	asname: 'Telecom Argentina S.A.',
	mobile: false,
	proxy: false,
	hosting: false
}
const mockedOpenWeather = {
	coord: { lon: -57.5575, lat: -38.0023 },
	weather: [
		{ id: 501, main: 'Rain', description: 'lluvia moderada', icon: '10d' }
	],
	base: 'stations',
	main: {
		temp: 8.18,
		feels_like: 5.35,
		temp_min: 7.78,
		temp_max: 8.46,
		pressure: 1009,
		humidity: 51
	},
	visibility: 10000,
	wind: { speed: 4.92, deg: 231, gust: 11.62 },
	rain: { '1h': 1.46 },
	clouds: { all: 40 },
	dt: 1622301388,
	sys: {
		type: 2,
		id: 264934,
		country: 'AR',
		sunrise: 1622285727,
		sunset: 1622320814
	},
	timezone: -10800,
	id: 3430863,
	name: 'Mar del Plata',
	cod: 200
}
const mockedOpenWeatherUpdated = {
	coord: { lon: -57.5575, lat: -38.0023 },
	weather: [
		{ id: 500, main: 'Rain', description: 'lluvia ligera', icon: '10d' }
	],
	base: 'stations',
	main: {
		temp: 8.61,
		feels_like: 5.54,
		temp_min: 8.01,
		temp_max: 9.57,
		pressure: 1009,
		humidity: 53
	},
	visibility: 9000,
	wind: { speed: 5.81, deg: 238, gust: 13.86 },
	rain: { '1h': 0.65 },
	clouds: { all: 40 },
	dt: 1622304941,
	sys: {
		type: 2,
		id: 264934,
		country: 'AR',
		sunrise: 1622285727,
		sunset: 1622320814
	},
	timezone: -10800,
	id: 3430863,
	name: 'Mar del Plata',
	cod: 200
}
const mockedForecast = {
	lat: -38.001,
	lon: -57.5647,
	timezone: 'America/Argentina/Buenos_Aires',
	timezone_offset: -10800,
	daily: [
		{
			dt: 1622386800,
			sunrise: 1622372171,
			sunset: 1622407191,
			moonrise: 1622423280,
			moonset: 1622387580,
			moon_phase: 0.66,
			temp: {
				day: 285.53,
				min: 279.72,
				max: 285.53,
				night: 281.78,
				eve: 283.11,
				morn: 279.78
			},
			feels_like: { day: 284.02, night: 278.08, eve: 280.88, morn: 275.32 },
			pressure: 1014,
			humidity: 46,
			dew_point: 274.25,
			wind_speed: 9.04,
			wind_deg: 263,
			wind_gust: 16.04,
			weather: [
				{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
			],
			clouds: 0,
			pop: 0.1,
			uvi: 1.9
		},
		{
			dt: 1622473200,
			sunrise: 1622458612,
			sunset: 1622493567,
			moonrise: 1622513760,
			moonset: 1622476440,
			moon_phase: 0.69,
			temp: {
				day: 287.47,
				min: 281.99,
				max: 287.47,
				night: 283.37,
				eve: 283.85,
				morn: 283.69
			},
			feels_like: { day: 286.6, night: 282.56, eve: 283.01, morn: 282.42 },
			pressure: 1010,
			humidity: 63,
			dew_point: 280.53,
			wind_speed: 11.66,
			wind_deg: 304,
			wind_gust: 21.72,
			weather: [
				{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
			],
			clouds: 4,
			pop: 0.19,
			uvi: 1.93
		},
		{
			dt: 1622559600,
			sunrise: 1622545052,
			sunset: 1622579945,
			moonrise: 0,
			moonset: 1622564880,
			moon_phase: 0.73,
			temp: {
				day: 286.02,
				min: 282.79,
				max: 286.52,
				night: 285.29,
				eve: 286.29,
				morn: 284.71
			},
			feels_like: { day: 285.4, night: 284.73, eve: 286.06, morn: 284.14 },
			pressure: 1002,
			humidity: 78,
			dew_point: 282.25,
			wind_speed: 9.14,
			wind_deg: 298,
			wind_gust: 17.54,
			weather: [
				{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }
			],
			clouds: 100,
			pop: 1,
			rain: 11.73,
			uvi: 1.59
		},
		{
			dt: 1622646000,
			sunrise: 1622631490,
			sunset: 1622666325,
			moonrise: 1622604000,
			moonset: 1622652960,
			moon_phase: 0.75,
			temp: {
				day: 284.17,
				min: 282.62,
				max: 284.4,
				night: 282.62,
				eve: 283.03,
				morn: 283.52
			},
			feels_like: { day: 283, night: 280.84, eve: 280.38, morn: 282.65 },
			pressure: 1015,
			humidity: 64,
			dew_point: 277.7,
			wind_speed: 11.65,
			wind_deg: 205,
			wind_gust: 17.06,
			weather: [
				{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
			],
			clouds: 100,
			pop: 0.54,
			rain: 0.93,
			uvi: 1.9
		},
		{
			dt: 1622732400,
			sunrise: 1622717928,
			sunset: 1622752706,
			moonrise: 1622694120,
			moonset: 1622740860,
			moon_phase: 0.79,
			temp: {
				day: 283.68,
				min: 280.78,
				max: 285.11,
				night: 285.11,
				eve: 284.76,
				morn: 281.52
			},
			feels_like: { day: 282.54, night: 284.16, eve: 283.73, morn: 280.02 },
			pressure: 1019,
			humidity: 67,
			dew_point: 277.79,
			wind_speed: 8.78,
			wind_deg: 351,
			wind_gust: 15.51,
			weather: [
				{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
			],
			clouds: 96,
			pop: 0.43,
			rain: 0.74,
			uvi: 0.2
		},
		{
			dt: 1622818800,
			sunrise: 1622804365,
			sunset: 1622839089,
			moonrise: 1622784060,
			moonset: 1622828700,
			moon_phase: 0.82,
			temp: {
				day: 286.89,
				min: 284.22,
				max: 287.18,
				night: 285.58,
				eve: 285.97,
				morn: 284.38
			},
			feels_like: { day: 286.02, night: 285.05, eve: 285.37, morn: 283.31 },
			pressure: 1009,
			humidity: 65,
			dew_point: 280.25,
			wind_speed: 10.04,
			wind_deg: 326,
			wind_gust: 21.26,
			weather: [
				{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
			],
			clouds: 100,
			pop: 0.52,
			rain: 1.11,
			uvi: 1
		},
		{
			dt: 1622905200,
			sunrise: 1622890800,
			sunset: 1622925474,
			moonrise: 1622874000,
			moonset: 1622916540,
			moon_phase: 0.85,
			temp: {
				day: 286.08,
				min: 282.18,
				max: 287.22,
				night: 282.51,
				eve: 284.19,
				morn: 283.58
			},
			feels_like: { day: 285.02, night: 280.25, eve: 283.02, morn: 282.25 },
			pressure: 1015,
			humidity: 61,
			dew_point: 278.64,
			wind_speed: 7.63,
			wind_deg: 231,
			wind_gust: 14.36,
			weather: [
				{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
			],
			clouds: 0,
			pop: 0.1,
			uvi: 1
		},
		{
			dt: 1622991600,
			sunrise: 1622977235,
			sunset: 1623011861,
			moonrise: 1622963820,
			moonset: 1623004440,
			moon_phase: 0.88,
			temp: {
				day: 284.87,
				min: 280.3,
				max: 286.48,
				night: 281.99,
				eve: 283.76,
				morn: 280.3
			},
			feels_like: { day: 283.3, night: 279.78, eve: 282.34, morn: 277.58 },
			pressure: 1023,
			humidity: 46,
			dew_point: 273.73,
			wind_speed: 4.3,
			wind_deg: 255,
			wind_gust: 6.89,
			weather: [
				{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }
			],
			clouds: 0,
			pop: 0,
			uvi: 1
		}
	],
	alerts: [
		{
			sender_name: 'Servicio Meteorologico Nacional',
			event: 'Viento',
			start: 1622462400,
			end: 1622483999,
			description:
				'El área continua afectada por vientos del sector oeste, con velocidades entre 30 y 45 km/h, y ráfagas que podrían alcanzar los 70 km/h.\n\n\n',
			tags: ['Wind']
		}
	]
}

describe('Test sagas', () => {
	test('watchGetGeolocation & watchGetGeolocationSuccess fired on init app', async () => {
		api.getPositionByIp = jest.fn(() => Promise.resolve(mockedGeolocation))
		api.getWeather = jest.fn(() => Promise.resolve(mockedOpenWeather))

		const sagaTester = new SagaTester({
			reducers,
			initialState: { cities: [], loading: true, error: null }
		})

		// Expected called actions
		const getGeolocationAction = getGeolocation()
		const getGeolocationSuccessAction = getGeolocationSuccess(mockedGeolocation)
		const getWeatherByGeolocationSuccessAction =
			getWeatherByGeolocationSuccess(mockedOpenWeather)

		sagaTester.start(watchGetGeolocation)
		sagaTester.start(watchGetGeolocationSuccess)

		sagaTester.dispatch(getGeolocationAction) // Fired when Index is mounted

		await sagaTester.waitFor(getGeolocationSuccessAction.type)
		await sagaTester.waitFor(getWeatherByGeolocationSuccessAction.type)

		// Called actions
		expect(sagaTester.getCalledActions()).toEqual([
			getGeolocationAction,
			getGeolocationSuccessAction,
			getWeatherByGeolocationSuccessAction
		])

		// Check Api services called once
		expect(api.getPositionByIp.mock.calls).toEqual([[]])
		expect(api.getWeather.mock.calls).toEqual([[`q=${mockedGeolocation.city}`]])

		// Check state update
		expect(sagaTester.getState()).toEqual({
			cities: [mockedOpenWeather],
			loading: false,
			error: null
		})
	})

	test('watchSearchCity fired when user search a city', async () => {
		api.getWeather = jest.fn(() => Promise.resolve(mockedOpenWeather))
		const sagaTester = new SagaTester({
			reducers,
			initialState: { cities: [], loading: true, error: null }
		})

		// Expected called actions
		const searchCityAction = searchCity(mockedOpenWeather.name)
		const searchCitySuccessAction = searchCitySuccess(mockedOpenWeather)

		sagaTester.start(watchSearchCity)
		sagaTester.dispatch(searchCityAction)

		await sagaTester.waitFor(searchCitySuccessAction.type)

		// Check called actions
		expect(sagaTester.getCalledActions()).toEqual([
			searchCityAction,
			searchCitySuccessAction
		])

		// Check openWeather called whit right parameters
		expect(api.getWeather.mock.calls).toEqual([[`q=${mockedGeolocation.city}`]])

		// Check state update
		expect(sagaTester.getState()).toEqual({
			cities: [mockedOpenWeather],
			loading: false,
			error: null
		})
	})

	test('watchUpdateWeather fired when user update city weather', async () => {
		api.getWeather = jest.fn(() => Promise.resolve(mockedOpenWeatherUpdated))
		const sagaTester = new SagaTester({
			reducers,
			initialState: { cities: [mockedOpenWeather], loading: true, error: null }
		})

		// Expected called actions
		const updateWeatherAction = updateWeather(mockedOpenWeather.id)
		const updateWeatherSuccessAction = updateWeatherSuccess(
			mockedOpenWeatherUpdated
		)

		sagaTester.start(watchUpdateWeather)
		sagaTester.dispatch(updateWeatherAction)

		await sagaTester.waitFor(updateWeatherSuccessAction.type)

		// Check actions
		expect(sagaTester.getCalledActions()).toEqual([
			updateWeatherAction,
			updateWeatherSuccessAction
		])

		// Check api call
		expect(api.getWeather.mock.calls).toEqual([[`id=${mockedOpenWeather.id}`]])

		// Check state update
		expect(sagaTester.getState()).toEqual({
			cities: [mockedOpenWeatherUpdated],
			loading: false,
			error: null
		})
	})

	test('watchGetForecastWeather should call OpenWeather and update the forecast for the city', async () => {
		api.getForecastWeather = jest.fn(() => Promise.resolve(mockedForecast))
		const sagaTester = new SagaTester({
			reducers,
			initialState: { cities: [mockedOpenWeather], loading: true, error: null }
		})

		const { id, coord } = mockedOpenWeather

		// Expected actions
		const getForecastWeatherAction = getForecastWeather(
			id,
			coord.lat,
			coord.lon
		)
		const getForecastWeatherSuccessAction = getForecastWeatherSuccess(
			id,
			mockedForecast
		)

		sagaTester.start(watchGetForecastWeather)
		sagaTester.dispatch(getForecastWeatherAction)

		await sagaTester.waitFor(getForecastWeatherSuccessAction.type)

		// Check api call
		expect(api.getForecastWeather.mock.calls).toEqual([[coord.lat, coord.lon]])

		// Check called actions
		expect(sagaTester.getCalledActions()).toEqual([
			getForecastWeatherAction,
			getForecastWeatherSuccessAction
		])

		// Check state
		expect(sagaTester.getState()).toEqual({
			cities: [{ ...mockedOpenWeather, forecast: mockedForecast }],
			loading: false,
			error: null
		})
	})
})

describe('State Reducers', () => {
	test('removeCityById should remove a city from store by id', () => {
		const store = new SagaTester({
			reducers,
			initialState: {
				cities: [{ ...mockedOpenWeather, forecast: mockedForecast }]
			}
		})

		// dispatch action
		store.dispatch(removeCityById(mockedOpenWeather.id))

		// Check state
		expect(store.getState().cities).toEqual([])
	})
})
