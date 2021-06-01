import React from 'react'
import styled from 'styled-components/native'
import {
	Headline,
	Title,
	Subheading,
	Colors,
	Caption
} from 'react-native-paper'
import { weatherIcons } from '../constans'
import InfoBox from './CityDetails/InfoBox'
import MainIcon from './CityDetails/MainIcon'
import BtnOption from './CityDetails/BtnOption'

const Container = styled.View`
	align-items: center;
	justify-content: center;
	padding: 12px 4px;
	margin: 16px 0;
	position: relative;
	border-radius: 16px;
	background-color: ${Colors.white};
`
const Details = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: space-around;
`
const Footer = styled.View`
	margin-top: 12px;
	padding: 4px;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
`

const CityDetails = ({
	name,
	main,
	weather,
	wind,
	dt,
	onGetForecast,
	onUpdateWeather,
	onRemove
}) => {
	const day = new Date(dt * 1000)

	const icon =
		weatherIcons.find(i => weather.some(w => i.id === w.icon)) ||
		weatherIcons[0]

	const info = [
		{ icon: 'thermometer-lines', text: `${main.feels_like}°` },
		{ icon: 'thermometer-minus', text: `${main.temp_min}°` },
		{ icon: 'thermometer-plus', text: `${main.temp_max}°` },
		{ icon: 'speedometer', text: `${main.pressure}hPa` },
		{ icon: 'water-percent', text: `${main.humidity}%` },
		{ icon: 'weather-windy', text: `${wind.speed}km` }
	]
	return (
		<Container>
			<Caption>
				{day.toLocaleDateString('en-GB')} {day.toLocaleTimeString('es-AR')}
			</Caption>
			<Title>{name}</Title>
			{main && (
				<>
					<Headline>{main.temp}°</Headline>
					<Subheading>
						{weather.map(({ description }) => description).join(', ')}
					</Subheading>
					<MainIcon icon={icon.name} color={icon.color} />
					<Details>
						{info.map(item => (
							<InfoBox icon={item.icon} key={item.icon}>
								{item.text}
							</InfoBox>
						))}
					</Details>
				</>
			)}
			<Footer>
				<BtnOption onPress={onGetForecast}>VER PRONOSTICO</BtnOption>
				<BtnOption onPress={onUpdateWeather}>ACTUALIZAR</BtnOption>
				<BtnOption onPress={onRemove}>BORRAR</BtnOption>
			</Footer>
		</Container>
	)
}

export default CityDetails
