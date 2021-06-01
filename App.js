import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper'
import ReduxProvider from './src/redux'
import Index from './src/screens/Index'
import Forecast from './src/screens/Forecast'
import ErrorAlert from './src/components/ErrorAlert'
import SnackBar from './src/components/SnackBar'

const Stack = createStackNavigator()

const App = () => {
	return (
		<ReduxProvider>
			<PaperProvider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Index">
						<Stack.Screen
							name="Index"
							component={Index}
							options={{ title: 'OpenWeather' }}
						/>
						<Stack.Screen
							name="Forecast"
							component={Forecast}
							options={{ title: 'Pronóstico del tiempo a 5 días' }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
				<ErrorAlert />
				<SnackBar />
			</PaperProvider>
		</ReduxProvider>
	)
}

export default App
