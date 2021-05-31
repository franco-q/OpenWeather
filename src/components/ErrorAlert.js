import React from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'
import { connect } from 'react-redux'

const mapStateToProps = ({ error }) => ({ error })
const mapDispatchToProps = dispatch => ({})

const ErrorAlert = ({ error }) => (
	<AwesomeAlert
		show={!!error}
		showProgress={false}
		title="Error"
		message={error && error.message ? error.message : ''}
		closeOnTouchOutside={true}
		closeOnHardwareBackPress={false}
	/>
)

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlert)
