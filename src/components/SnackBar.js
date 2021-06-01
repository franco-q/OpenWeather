import React from 'react'
import { Snackbar } from 'react-native-paper'
import { connect } from 'react-redux'
import { removeSnackBar } from '../redux/actions'

const mapStateToProps = ({ snackbar }) => ({ snackbar })
const mapDispatchToProps = dispatch => ({
	clear: () => dispatch(removeSnackBar())
})

const SnackBar = ({ snackbar = {}, clear }) => {
	const message = snackbar && snackbar.message ? snackbar.message : ''
	const onDismiss = () => {
		clear() //dispatch removeSnackBar
		// Si snackbar.onDismissS es un calllback
		if (
			snackbar &&
			snackbar.onDismissS &&
			{}.toString.call(snackbar.onDismissS) === '[object Function]'
		) {
			snackbar.onDismissS()
		}
	}
	return (
		<Snackbar visible={!!snackbar} onDismiss={onDismiss}>
			{message}
		</Snackbar>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar)
