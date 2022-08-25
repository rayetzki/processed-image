
import React, { MouseEvent, useState } from 'react';
import css from './FullImage.module.css';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import cx from 'classnames';
import type { FullScreenView } from '../types';
import BackArrow from '../public/upwards.svg'; 

enum ControlKeys {
	LEFT = 'ArrowLeft',
	RIGHT = 'ArrowRight',
	CLOSE = 'Escape',
};

interface FullImageProps extends FullScreenView {
	setOpen: (newValue: boolean) => void;
}

export default function FullImage({ isOpen, setOpen, image, images }: FullImageProps) {
	const [viewed, setViewed] = useState({ image, index: images?.findIndex(i => i === image) || 0 });
	const [swiping, setSwiping] = useState<number>();

	const switchNextImage = React.useCallback((type: 'left' | 'right', e?: MouseEvent<HTMLButtonElement>) => {
		e?.stopPropagation();
		if (!images?.length) return;
		const nextIndex = (
			type === 'left' && viewed.index - 1 <= 0 ? images.length - 1 : 
			type === 'right' && viewed.index + 1 >= images.length - 1 ? 0 :
			type === 'right' ? viewed.index + 1 :
			type === 'left' ? viewed.index - 1 : viewed.index
		);
		setViewed({ image: images[nextIndex], index: nextIndex });
		if (swiping) requestAnimationFrame(() => setSwiping(0));
	}, [images, swiping, viewed.index]);

	const handleArrowKeys = React.useCallback((e: KeyboardEvent) => {
		if (e.key === ControlKeys.CLOSE) {
			setOpen(!isOpen);
		} else if (e.key === ControlKeys.LEFT) {
			switchNextImage('left');
		} else if (e.key === ControlKeys.RIGHT) {
			switchNextImage('right');
		}
	}, [switchNextImage, setOpen, isOpen]);

	React.useEffect(() => {
		window.addEventListener('keyup', handleArrowKeys);
		return () => window.removeEventListener('keyup', handleArrowKeys);
	}, [viewed, handleArrowKeys]);

	const handlers = useSwipeable({
		onSwipedLeft: () => switchNextImage('left'),
		onSwipedRight: () => switchNextImage('right'),
		onSwiping: e => setSwiping(e.deltaX),
		preventDefaultTouchmoveEvent: false,
		delta: 5
	});

	return isOpen ? (
		<div className={css.Overlay} onClick={() => setOpen(!isOpen)}>
			<button 
				onClick={e => switchNextImage('left', e)} 
				className={cx(css.Overlay__Arrows, {
					[css.ArrowHidden]: !images
				})}>
				<BackArrow className={css.ArrowBack} width={36} height={36} />
			</button>
			<div style={{transform: `translateX(${swiping}px)`}} className={css.FullImage} {...handlers}>
				<Image 
					src={viewed.image}
					layout='fill'
					objectFit='contain'
					onClick={e => e.stopPropagation()}
					onContextMenu={e => e.preventDefault()}
					alt='Картинка в полный экран'
				/>
			</div>
			<button
				onClick={e => switchNextImage('right', e)} 
				className={cx(css.Overlay__Arrows, {
					[css.ArrowHidden]: !images
				})}>
				<BackArrow className={css.ArrowForward} width={36} height={36} />
			</button>
		</div>
	) : null;
}