
import React, { MouseEvent, useEffect, useState } from 'react';
import css from './FullImage.module.css';
import Image from 'next/image';
import type { FullScreenView } from '../types';
import BackArrow from '../public/upwards.svg'; 
import cx from 'classnames';

interface FullImageProps extends FullScreenView {
	setOpen: (newValue: boolean) => void;
}

export default function FullImage({ isOpen, setOpen, image, images }: FullImageProps) {
	const [viewed, setViewed] = useState({ image, index: images?.findIndex(i => i === image) || 0 });
	console.log({ viewed, images })

	const closeOnKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') setOpen(!isOpen);
	};

	const switchNextImage = (e: MouseEvent<HTMLButtonElement>, type: 'left' | 'right') => {
		e.stopPropagation();
		if (!images?.length) return;
		const nextIndex = type === 'left' ? viewed.index - 1 : viewed.index + 1; 
		if (
			type === 'left' && nextIndex < 0 || 
			type === 'right' && nextIndex > images.length
		) return;
		setViewed({ image: images[nextIndex], index: nextIndex });
	};

	useEffect(() => {
		window.addEventListener('keydown', closeOnKeyDown);
		return () => window.removeEventListener('keydown', closeOnKeyDown);
	}, []);

	return isOpen ? (
		<div className={css.Overlay} onClick={() => setOpen(!isOpen)}>
			<button 
				onClick={e => switchNextImage(e, 'left')} 
				className={cx(css.Overlay__Arrows, {
					[css.ArrowHidden]: images && images.length > 0 && viewed.index - 1 <= 0
				})}>
				<BackArrow className={css.ArrowBack} width={36} height={36} />
			</button>
			<Image 
				src={viewed.image}
				layout='fill'
				objectFit='contain'
				onClick={e => e.stopPropagation()}
				className={css.FullImage}
				alt='Картинка в полный экран'
			/>
			<button
				onClick={e => switchNextImage(e, 'right')} 
				className={cx(css.Overlay__Arrows, {
					[css.ArrowHidden]: images && images.length > 0 && viewed.index + 1 >= images.length
				})}>
				<BackArrow className={css.ArrowForward} width={36} height={36} />
			</button>
		</div>
	) : null;
}