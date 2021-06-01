import React from 'react'
import { Colors } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

const Container = styled.View`
	align-items: center;
	padding: 8px;
`
const InfoBox = ({ icon, color }) => (
	<Container>
		<Icon name={icon} color={color || Colors.grey600} size={6 * 24} />
	</Container>
)

export default InfoBox
