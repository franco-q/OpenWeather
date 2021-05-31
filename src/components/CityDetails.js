import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import {
	Headline,
	Button,
	Title,
	Subheading,
	Text,
	Colors
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { weatherIcons } from '../constans'

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
const Header = styled.View`
	flex-direction: row;
`
const Detail = styled.View`
	align-items: center;
	flex: 6;
`
const MainIcon = styled.View`
	align-items: center;
	padding: 8px;
`
const Footer = styled.View`
	padding: 8px;
	flex-direction: row;
	width: 100%;
	justify-content: space-around;
`

const CityDetails = ({
	name,
	main,
	weather,
	wind,
	onGetForecast,
	onUpdateWeather
}) => {
	const icon =
		weatherIcons.find(i => weather.some(w => i.id === w.icon)) ||
		weatherIcons[0]

	return (
		<Container>
			<Header>
				<Title>{name}</Title>
			</Header>
			{main && (
				<>
					<Headline>{main.temp}°</Headline>
					<Subheading>
						{weather.map(({ description }) => description).join(', ')}
					</Subheading>
					<MainIcon>
						<Icon
							name={icon.name}
							color={icon.color || Colors.grey600}
							size={6 * 24}
						/>
					</MainIcon>
					<Details>
						{main.feels_like && (
							<Detail>
								<Icon
									name="thermometer-lines"
									color={Colors.grey600}
									size={24}
								/>
								<Text>{main.feels_like}°</Text>
							</Detail>
						)}
						{main.temp_min && (
							<Detail>
								<Icon
									name="thermometer-minus"
									color={Colors.grey600}
									size={24}
								/>
								<Text>{main.temp_min}°</Text>
							</Detail>
						)}
						{main.temp_max && (
							<Detail>
								<Icon
									name="thermometer-plus"
									color={Colors.grey600}
									size={24}
								/>
								<Text>{main.temp_max}°</Text>
							</Detail>
						)}
						{main.humidity && (
							<Detail>
								<Icon name="water-percent" color={Colors.grey600} size={24} />
								<Text>{main.humidity}%</Text>
							</Detail>
						)}
						{main.pressure && (
							<Detail>
								<Icon name="speedometer" color={Colors.grey600} size={24} />
								<Text>{main.pressure}hPa</Text>
							</Detail>
						)}
						{wind && (
							<Detail>
								<Icon name="weather-windy" color={Colors.grey600} size={24} />
								<Text>{wind.speed}km</Text>
							</Detail>
						)}
					</Details>
				</>
			)}
			<Footer>
				<Button
					compact
					mode="Text"
					color={Colors.grey900}
					onPress={onGetForecast}>
					Ver pronostico
				</Button>
				<Button
					compact
					mode="Text"
					color={Colors.grey900}
					onPress={onUpdateWeather}>
					Actualizar
				</Button>
				<Button
					compact
					mode="Text"
					color={Colors.grey900}
					onPress={() => console.log('Pressed')}>
					Borrar
				</Button>
			</Footer>
		</Container>
	)
}

export default CityDetails
