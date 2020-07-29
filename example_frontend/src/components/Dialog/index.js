import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

export default ({ title, contentText, handleOpen, handleClose, open }) => {
	return (
		<Dialog open={open} onClose={handleClose} scroll="paper">
			<DialogTitle>{title}</DialogTitle>
			<DialogContent dividers>
				<DialogContentText>{termsText}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Zavřít
				</Button>
			</DialogActions>
		</Dialog>
	)
}

const termsText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere ut dolor vel tempor. Nam commodo bibendum dolor, pulvinar gravida eros
					eleifend molestie. Donec euismod eget ligula a interdum. Pellentesque a risus sit amet nisl volutpat pretium non sed justo. Nullam faucibus
					dui at sapien elementum lacinia. Quisque tempor leo sed suscipit tempus. Suspendisse nibh quam, rutrum in sollicitudin sit amet, convallis
					quis mi. Aliquam tincidunt augue velit. Nam eleifend in elit et commodo. In pulvinar, orci non feugiat dapibus, eros dui rhoncus lectus, ut
					efficitur sem lectus vitae nibh. Donec eget mollis arcu. Fusce a aliquet eros.`
