import React from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { Colors, Headline } from 'react-native-paper'
import ForecastDetails from '../components/ForecastDetails'
import Loading from '../components/Loading'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.white};
`
const Title = styled(Headline)`
	padding: 8px;
`

const mapStateToProps = (state, props) => ({
	loading: state.loading,
	city: state.cities.find(city => city.id === props.route.params.id) // params from GET_FORECAST_WEATHER_SUCCESS
})

const Forecast = ({ loading, city }) => {
	return (
		<Container>
			{loading ? (
				<Loading />
			) : (
				city && (
					<>
						<Title>{city.name}</Title>
						{city.forecast && (
							<FlatList
								data={city.forecast.daily.slice(1, 6)}
								keyExtractor={item => item.dt}
								renderItem={({ item }) => <ForecastDetails {...item} />}
							/>
						)}
					</>
				)
			)}
		</Container>
	)
}

export default connect(mapStateToProps)(Forecast)
