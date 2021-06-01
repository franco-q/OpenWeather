import React from 'react'
import { Colors, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

const Container = styled.View`
	align-items: center;
	flex: 1;
`
const InfoBox = ({ icon, color, children }) => (
	<Container>
		<Icon name={icon} color={color || Colors.grey600} size={24} />
		<Text>{children}</Text>
	</Container>
)

export default InfoBox
