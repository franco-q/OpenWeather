/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { Colors, IconButton } from 'react-native-paper'
import {
	getForecastWeather,
	getGeolocation,
	removeCityById,
	searchCity,
	updateWeather
} from '../redux/actions'
import SearchBox from '../components/SearchBox'
import CityDetails from '../components/CityDetails'
import Loading from '../components/Loading'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.grey200};
	padding: 0 8px;
`

const mapStateToProps = state => ({
	cities: state.cities,
	loading: state.loading,
	redirect: state.redirect
})

const mapDispatchToProps = dispatch => ({
	geolocate: () => {
		dispatch(getGeolocation())
	},
	search: place => {
		dispatch(searchCity(place))
	},
	updateWeatherById: id => {
		dispatch(updateWeather(id))
	},
	removeCity: id => {
		dispatch(removeCityById(id))
	},
	getForecast: city => {
		const { id, coord } = city
		dispatch(getForecastWeather(id, coord.lat, coord.lon))
	}
})

const Index = ({
	geolocate,
	search,
	cities,
	loading,
	navigation,
	updateWeatherById,
	removeCity,
	getForecast,
	redirect
}) => {
	useEffect(() => {
		geolocate() // dispatch getGeolocation
	}, [])

	useEffect(() => {
		// si store.redirect es enviado
		if (redirect && redirect.screen) {
			navigation.navigate(redirect.screen, redirect.params) // navigate to screen
		}
	}, [redirect])

	const [showSearchBox, setShowSearchBox] = useState(false)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<IconButton
					icon={showSearchBox ? 'close' : 'map-search'}
					color={Colors.grey800}
					size={4 * 7}
					onPress={() => setShowSearchBox(v => !v)} // comportamiento del Componente navigation header right
				/>
			)
		})
	}, [showSearchBox])

	return (
		<Container>
			{loading && <Loading />}
			{showSearchBox && <SearchBox onSearch={search} />}
			<FlatList
				data={cities}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<CityDetails
						name={item.name}
						main={item.main}
						weather={item.weather}
						wind={item.wind}
						onGetForecast={() => getForecast(item)} //dispatch actions
						onUpdateWeather={() => updateWeatherById(item.id)} //dispatch actions
						onRemove={() => removeCity(item.id)} //dispatch actions
					/>
				)}
			/>
		</Container>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
