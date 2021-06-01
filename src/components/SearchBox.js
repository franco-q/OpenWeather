import React, { useState } from 'react'
import { Keyboard, View } from 'react-native'
import { Button, Caption } from 'react-native-paper'
import styled from 'styled-components/native'

const Input = styled.TextInput`
	background-color: aliceblue;
	border-radius: 8px;
	padding: 4px 8px;
	height: 32px;
`
const Container = styled.View`
	padding: 4px 12px;
`
const Row = styled.View`
	flex-direction: row;
`
const InputWrap = styled.View`
	flex: 1;
	justify-content: center;
	padding-right: 4px;
`

export default ({ onSearch, cities }) => {
	const [val, setVal] = useState('')

	const searchAndClear = () => {
		if (val && val.length > 3) {
			Keyboard.dismiss()
			onSearch(val)
			setVal('')
		}
	}

	return (
		<Container>
			<Caption>Buscar ciudad {(cities || []).length}/5</Caption>
			<Row>
				<InputWrap>
					<Input
						editable={(cities || []).length < 5}
						onChangeText={setVal}
						value={val}
					/>
				</InputWrap>
				<View>
					<Button
						mode="text"
						onPress={searchAndClear}
						disabled={!val || val.length <= 3}>
						Buscar
					</Button>
				</View>
			</Row>
		</Container>
	)
}
