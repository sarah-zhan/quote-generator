import React from 'react';
import Image from 'next/image';
import Lottie from 'react-lottie-player';
import lottieJson from '../../assets/animated-photo.json';
import { CenteredLottie, DownloadButtonContainer, DownloadButtonText } from './AnimationElements';



const DownloadButton = ({handleDownload}: AnimatedDownloadButtonProps) => {
	return (
    <DownloadButtonContainer onClick={handleDownload}>
      <CenteredLottie
        loop
        animationData={lottieJson}
        play
      />
      <DownloadButtonText>Download Me</DownloadButtonText>
    </DownloadButtonContainer>
  );
}

export default DownloadButton;
