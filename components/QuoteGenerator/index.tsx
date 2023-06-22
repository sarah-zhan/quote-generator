import { Modal, Backdrop, Fade } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {
	ModalCircularProgress,
	QuoteGeneratorModalContainer,
	QuoteGeneratorModalInnerContainer,
	QuoteGeneratorSubTitle,
	QuoteGeneratorTitle,
} from './QuoteGeneratorElements';
import ImageBlock from '../animation/ImageBlock';
import { ImageBlockContainer } from '../animation/AnimationElements';
import DownloadButton from '../animation/DownloadButton';

interface QuoteGeneratorModalProps {
	open: boolean;
	close: () => void;
	processingQuote: boolean;
	setProcessingQuote: React.Dispatch<React.SetStateAction<boolean>>;
	quoteReceived: String | null;
	setQuoteReceived: React.Dispatch<React.SetStateAction<String | null>>;
}

const style = {};

const QuoteGeneratorModal = ({
	open,
	close,
	processingQuote,
	setProcessingQuote,
	quoteReceived,
	setQuoteReceived,
}: QuoteGeneratorModalProps) => {
	const wiseDevQuote = "If you don't know where to start, start where you are.";
	const wiseDevQuoteAuthor = 'From an experienced Software Developer';

	const [blobUrl, setBlobUrl] = useState<string | null>(null);

	// handles download
	const handleDownload = () => {
		const link = document.createElement('a');
		if (typeof blobUrl === 'string') {
			link.download = 'quote.png';
			link.href = blobUrl;
			link.click();
		}
	};

	// handles received
	useEffect(() => {
		if (quoteReceived) {
			const binaryData = Buffer.from(quoteReceived, 'base64');
			const blob = new Blob([binaryData], { type: 'image/png' });
			const url = URL.createObjectURL(blob);
			setBlobUrl(url);

			return () => {
				URL.revokeObjectURL(url);
			};
		}
	}, [quoteReceived]);

	return (
		<Modal
			id='QuoteGeneratorModal'
			aria-labelledby='spring-modal-quotegeneratormodal'
			aria-describedby='spring-modal-quotegeneratormodal-description'
			open={open}
			onClose={close}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<QuoteGeneratorModalContainer sx={style}>
					<QuoteGeneratorModalInnerContainer>
						{/* request a quote, but return null */}
						{processingQuote === true && quoteReceived === null && (
							<>
								<ModalCircularProgress size={'8rem'} thickness={2.5} />
								<QuoteGeneratorTitle>
									Creating your quote...
								</QuoteGeneratorTitle>
								<QuoteGeneratorSubTitle style={{ marginTop: '20px' }}>
									{wiseDevQuote}
									<br></br>
									<span style={{ fontSize: 26 }}>{wiseDevQuoteAuthor}</span>
								</QuoteGeneratorSubTitle>
							</>
						)}
						{quoteReceived !== null && (
							<>
								<QuoteGeneratorTitle>Your quote is ready!</QuoteGeneratorTitle>
								<QuoteGeneratorSubTitle style={{ marginTop: '20px' }}>
									Here is your preview:
								</QuoteGeneratorSubTitle>
								<ImageBlockContainer>
									<ImageBlock quoteReceived={quoteReceived} blobUrl={blobUrl} />
								</ImageBlockContainer>
								<DownloadButton handleDownload={handleDownload} />
							</>
						)}
					</QuoteGeneratorModalInnerContainer>
				</QuoteGeneratorModalContainer>
			</Fade>
		</Modal>
	);
};
export default QuoteGeneratorModal;
