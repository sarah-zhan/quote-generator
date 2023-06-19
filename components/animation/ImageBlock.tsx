import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageBlockProps {
	quoteReceived: String;
	blockUrl: string | null;
}

const ImageBlock = ({
	quoteReceived,
	// blockUrl
}: ImageBlockProps) => {
	const [blockUrl, setBlockUrl] = useState<string | null>(null);

	useEffect(() => {
		const response = {
			"statusCode": 200,
			"headers": {
				"Access-Control-Allow-Origin": "*",
				"content-type": "image/png"
			},
			"body": "blob",
			"isBase64Encoded": true
		}
		const binaryData = Buffer.from(response.body, 'base64');
		const blob = new Blob([binaryData], { type: response.headers['content-type'] });
		const newBlobUrl = URL.createObjectURL(blob);
		setBlockUrl(newBlobUrl);

		return () => {
			URL.revokeObjectURL(newBlobUrl);
		};
	}, [])

	if (!blockUrl) {
		return null;
	}

	return (
		<Image
			src={blockUrl}
			alt={'Generated quote card'}
			width={150}
			height={100}
		/>
	);
};

export default ImageBlock;
