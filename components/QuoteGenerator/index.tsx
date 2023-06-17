import { Modal, Backdrop, Fade } from '@mui/material';
import React from 'react'

interface QuoteGeneratorModalProps {
	open: boolean;
	close: () => void;
	processingQuote: boolean;
	setProcessingQuote: React.Dispatch<React.SetStateAction<boolean>>;
	quoteReceived: String | null;
	setQuoteReceived: React.Dispatch<React.SetStateAction<String | null>>;
}

const QuoteGeneratorModal = ({
	open,
	close,
	processingQuote,
	setProcessingQuote,
	quoteReceived,
	setQuoteReceived,
}: QuoteGeneratorModalProps) => {
  return (
		<Modal
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
		>
			<Fade in={open}>
				
			</Fade>
		</Modal>
	);
}
export default QuoteGeneratorModal