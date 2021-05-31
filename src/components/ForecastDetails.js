import React from 'react'
import { Subheading, Paragraph, Colors } from 'react-native-paper'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { weatherIcons } from '../constans'

const Container = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	padding: 8px;
	margin-bottom: 12px;
	position: relative;
`
const TitleCol = styled.View`
	flex: 1;
`
const ConditionCol = styled.View`
	flex: 1;
	align-items: center;
`
const TemperatureCol = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-around;
`
const MinTemp = styled.Text`
	color: ${Colors.grey500};
	font-weight: 700;
`
const MaxTemp = styled.Text`
	font-weight: 700;
`

var days = [
	'Domingo',
	'Lunes',
	'Martes',
	'Miércoles',
	'Jueves',
	'Viernes',
	'Sábado'
]

const ForecastDetails = ({ dt, temp, weather }) => {
	const day = new Date(dt * 1000)

	const icon =
		weatherIcons.find(i => weather.some(w => i.id === w.icon)) ||
		weatherIcons[0]
	return (
		<Container>
			<TitleCol>
				<Subheading>
					{days[day.getDay()]} {day.getDate()}/{day.getMonth() + 1}
				</Subheading>
				<Paragraph>{weather.map(w => w.description).join(', ')}</Paragraph>
			</TitleCol>
			<ConditionCol>
				<Icon name={icon.name} color={Colors.grey900} size={4 * 12} />
			</ConditionCol>
			<TemperatureCol>
				<MinTemp>{temp.min}°</MinTemp>
				<MaxTemp>{temp.max}°</MaxTemp>
			</TemperatureCol>
		</Container>
	)
}

export default ForecastDetails
