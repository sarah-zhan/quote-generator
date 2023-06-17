import { Modal } from '@mui/material';
import React from 'react'

const QuoteGeneratorModal = ({open, close, Backdrop}) => {
  return (
		<Modal>
			id="QuoteGeneratorModal"
			aria-labelledby="Quote-Generator"
			aria-describedby="Quote-Generator-Open-Close"
      open={open}
			onclose={close}
			closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
		</Modal>
	);
}
export default QuoteGeneratorModal