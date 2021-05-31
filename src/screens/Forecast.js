import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { Colors, Headline } from 'react-native-paper'
import ForecastDetails from '../components/ForecastDetails'
import { getForecastWeather } from '../redux/actions'
import Loading from '../components/Loading'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.white};
`
const Title = styled(Headline)`
	padding: 8px;
`
const Error = styled.Text`
	text-align: center;
	font-size: 40px;
	padding: 12px;
`

const mapStateToProps = (state, props) => ({
	loading: state.loading,
	forecast: state.cities.reduce(
		(prev, curr) =>
			curr.id === props.route.params.city.id ? curr.forecast : prev,
		{}
	)
})

const mapDispatchToProps = dispatch => ({
	getForecast: city => {
		const { id, coord } = city
		dispatch(getForecastWeather(id, coord.lat, coord.lon))
	}
})

const Forecast = ({ route, getForecast, loading, forecast }) => {
	useEffect(() => {
		getForecast(route.params.city)
	}, [getForecast, route.params.city])

	return (
		<Container>
			{loading ? (
				<Loading />
			) : forecast ? (
				<>
					<Title>{route.params.city.name}</Title>
					<FlatList
						data={forecast.daily.slice(1, 6)}
						keyExtractor={item => item.dt}
						renderItem={({ item }) => <ForecastDetails {...item} />}
					/>
				</>
			) : (
				<Error>:(</Error>
			)}
		</Container>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Forecast)
