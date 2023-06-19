import { Modal, Backdrop, Fade } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { ModalCircularProgress, QuoteGeneratorModalContainer, QuoteGeneratorModalInnerContainer, QuoteGeneratorSubTitle, QuoteGeneratorTitle } from './QuoteGeneratorElements';
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

const style = {

};


const QuoteGeneratorModal = ({
	open,
	close,
	processingQuote,
	setProcessingQuote,
	quoteReceived,
	setQuoteReceived,
}: QuoteGeneratorModalProps) => {

	const wiseDevQuote = "If you don't know where to start, start where you are.";
	const wiseDevQuoteAuthor = "From an experienced Software Developer";

	const [blockUrl, setBlockUrl] = useState<string | null>(null);

	// handles download
	const handleDownload = () => {
		const link = document.createElement('a');
		if (typeof blockUrl === 'string') {
			link.download = 'quote.png';
			link.href = blockUrl;
			link.click();
		}
	;

	// handles received

	const ModalCircleProgress = () => {
		return (
			<div style={{
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				borderRadius: "50%",
				backgroundColor: "#000",
				boxShadow: "0 0 5px #000",
			}}>
				<div style={{
					width: "100%",
					height: "100%",
					borderRadius: "50%",
					backgroundColor: "#fff",
					boxShadow: "0 0 5px #000",
				}}>
				</div>
			</div>
		);
	}

	const ModalCircleTitle = () => {
		return (
			<div style={{
				fontSize: "1.5rem",
				fontWeight: "bold",
				textAlign: "center",
			}}>
				Creating your quote...
			</div>
		);
	}

  return (
		<Modal
			id='QuoteGeneratorModal'
			aria-labelledby='Quote-Generator'
			aria-describedby='Quote-Generator-Open-Close'
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
									<span style={{ fontSize: 26 }}>
										<strong>{wiseDevQuoteAuthor}</strong>
									</span>
								</QuoteGeneratorSubTitle>
							</>
						)}
						{quoteReceived === null &&
							<>
								<QuoteGeneratorTitle>
									Your quote is ready!
								</QuoteGeneratorTitle>
								<QuoteGeneratorSubTitle style={{ marginTop: '20px' }}>
									Here is your preview:
								</QuoteGeneratorSubTitle>
								<ImageBlockContainer>
									<ImageBlock
										quoteReceived={quoteReceived}
										blockUrl={blockUrl}
									/>
								</ImageBlockContainer>
								<DownloadButton
									handleDownload={handleDownload}
								/>
							</>
						}
					</QuoteGeneratorModalInnerContainer>
				</QuoteGeneratorModalContainer>
			</Fade>
		</Modal>
	);
}
export default QuoteGeneratorModal