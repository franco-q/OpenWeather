import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native-paper'

const { height, width } = Dimensions.get('window')
const Container = styled.View`
	flex: 1;
	background-color: 'rgba(255, 255, 255, 0.8)';
	justify-content: center;
	position: absolute;
	height: ${height}px;
	width: ${width}px;
	z-index: 9;
`

const Loading = () => (
	<Container>
		<ActivityIndicator size={40} />
	</Container>
)

export default Loading
