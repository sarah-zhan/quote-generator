import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import exp from 'constants';

export const Background = styled.div`
	background: linear-gradient(to right, #000460, #1cb5e0);
	background-size: 400% 400%;
	animation: gradient 6s ease infinite;
	height: 100vh;
	width: 100vw;
	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
`;

export const BackgroundImage1 = styled(Image)`
	position: absolute;
	z-index: 1;
	margin-left: 63px;
	margin-top: 72px;
`;

export const BackgroundImage2 = styled(Image)`
	position: absolute;
	z-index: 1;
	right: 118px;
	bottom: 37px;
`;

export const Footer = styled.div`
  width: 100vw;
  height: 50px;
  text-align: center;
  font-family: "Source Code Pro", monospace;
  font-size: 15px;
  position: absolute;
  bottom: 0;
  color: white;
  z-index: 10;
`;

export const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

export const QuoteGenerator = styled.div`
	min-height: 350px;
	min-width: 350px;
	height: 30vh;
	width: 40vw;
	top: 30%;
	left: 30%;
	transform: translated(-50%, -50%);
	position: absolute;
	z-index: 2

	background: rgba(0, 0, 0, 0.75);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(9.5px);
	-webkit-backdrop-filter: blur(9.5px);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.18);
`;

export const QuoteGeneratorInner = styled.div`
	top: 30%;
	left: 30%;
	transform: translated(-50%, -50%);
	position: absolute;
	width: 100%;
`;

export const QuoteGeneratorTitle = styled.div`
	font-family: "Permanent Marker", cursive;
	font-size: 50px;
	text-align: center;
	color: white;
	padding: 0 20px 0 20px;
	position: relative;
	@media only screen and (max-width: 600px) {
		font-size: 30px;
	}
`;

export const QuoteGeneratorSubTitle = styled.div`
	font-family: "Caveat", cursive;
	font-size: 50px;
	text-align: center;
	color: white;
	width: 100%
	text-align: center;
	padding: 0 20px 0 20px;
	@media only screen and (max-width: 600px) {
		font-size: 25px;
`;

export const QuoteGeneratorButton = styled.div`
	
`;
