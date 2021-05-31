import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { Colors, IconButton } from 'react-native-paper'
import { getGeolocation, searchCity, updateWeather } from '../redux/actions'
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
	loading: state.loading
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
	}
})

const Index = ({
	geolocate,
	search,
	cities,
	loading,
	navigation,
	updateWeatherById
}) => {
	useEffect(() => {
		geolocate()
	}, [geolocate])

	const getForecast = city => {
		navigation.navigate('Forecast', { city })
	}

	const [showSearchBox, setShowSearchBox] = useState(false)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<IconButton
					icon={showSearchBox ? 'close' : 'map-search'}
					color={Colors.grey800}
					size={4 * 7}
					onPress={() => setShowSearchBox(v => !v)}
				/>
			)
		})
	}, [navigation, showSearchBox])

	return (
		<Container>
			{showSearchBox && <SearchBox onSearch={search} />}
			{loading && <Loading />}
			<FlatList
				data={cities}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<CityDetails
						name={item.name}
						main={item.main}
						weather={item.weather}
						wind={item.wind}
						onGetForecast={() => getForecast(item)}
						onUpdateWeather={() => updateWeatherById(item.id)}
					/>
				)}
			/>
		</Container>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
