import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';


export const ImageBlockContainer = styled.div`
	position: relative;
	text-align: center;
	top: 10px;
	margin-top: 20px;
	transition: all 0.3s ease;
	width: fit-content;
	margin: auto;
	height: 100px;
	z-index: 1000;

	&:hover {
		transform: scale(4.8);
		z-index: 1000;
		transition: all 0.3s ease;
		box-shadow: 0px 0px 80px 90px rgba(0, 0, 0, 0.5);

		@media only screen and (max-width: 768px) {
			transform: scale(3.8);
			z-index: 1000;
			transition: all 0.3s ease;
			box-shadow: 0px 0px 80px 90px rgba(0, 0, 0, 0.5);
		}
		@media only screen and (max-width: 480px) {
			transform: scale(2.8);
			z-index: 1000;
			transition: all 0.3s ease;
			box-shadow: 0px 0px 80px 90px rgba(0, 0, 0, 0.5);
		}
	}
`;