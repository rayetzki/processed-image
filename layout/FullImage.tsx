
import React, { useEffect, useState } from 'react';
import css from './FullImage.module.css';
import Image from 'next/image';
import type { FullScreenView } from '../types';

interface FullImageProps extends FullScreenView {
	setOpen: (newValue: boolean) => void;
}

export default function FullImage({ isOpen, setOpen, image, images }: FullImageProps) {
	const [currentlyViewed, setCurrentlyViewed] = useState(image);

	const closeOnKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') setOpen(!isOpen);
	};

	const switchNextImage = (type: 'left' | 'right') => {
		if (!images?.length) return;
		const currentlyViewedIndex = images.findIndex(i => i === currentlyViewed);
		
		if (type === 'left') {
			if (currentlyViewedIndex === 0) return;
			setCurrentlyViewed(images[currentlyViewedIndex - 1]);
		} else if (type === 'right') {
			if (currentlyViewedIndex === images.length) return;
			setCurrentlyViewed(images[currentlyViewedIndex + 1]);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', closeOnKeyDown);
		return () => window.removeEventListener('keydown', closeOnKeyDown);
	}, []);

	return isOpen ? (
		<div className={css.Overlay} onClick={() => setOpen(!isOpen)}>
			<Image 
				src={currentlyViewed}
				layout='fill'
				objectFit='contain'
				onClick={e => e.stopPropagation()}
				className={css.FullImage}
				alt='Картинка в полный экран'
			/>
		</div>
	) : null;
}