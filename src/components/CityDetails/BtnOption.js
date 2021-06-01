import React from 'react'
import { Colors } from 'react-native-paper'
import styled from 'styled-components/native'

const Btn = styled.TouchableOpacity`
	padding: 4px;
`
const Text = styled.Text`
	text-align: center;
	color: ${Colors.grey700};
	font-size: 14px;
`

const BtnOption = ({ icon, color, children, onPress }) => (
	<Btn onPress={onPress}>
		<Text>{children}</Text>
	</Btn>
)

export default BtnOption
