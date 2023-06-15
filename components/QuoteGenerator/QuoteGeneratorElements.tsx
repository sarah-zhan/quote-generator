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
