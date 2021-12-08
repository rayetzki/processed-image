
import { MouseEvent, useEffect, useState } from 'react';
import css from './FullImage.module.css';
import Image from 'next/image';
import { SwipeDirections, SwipeEventData, useSwipeable } from 'react-swipeable';
import type { FullScreenView } from '../types';
import BackArrow from '../public/upwards.svg'; 
import cx from 'classnames';

interface FullImageProps extends FullScreenView {
	setOpen: (newValue: boolean) => void;
}

export default function FullImage({ isOpen, setOpen, image, images }: FullImageProps) {
	const [viewed, setViewed] = useState({ image, index: images?.findIndex(i => i === image) || 0 });
	const [swiping, setSwiping] = useState<number>();

	function closeOnKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') setOpen(!isOpen);
	};

	function switchNextImage(type: 'left' | 'right', e?: MouseEvent<HTMLButtonElement>) {
		e?.stopPropagation();
		if (!images?.length) return;
		const nextIndex = (
			type === 'left' && viewed.index - 1 <= 0 ? images.length - 1 : 
			type === 'right' && viewed.index + 1 >= images.length - 1 ? 0 :
			type === 'right' ? viewed.index + 1 :
			type === 'left' ? viewed.index - 1 : viewed.index
		);
		setViewed({ image: images[nextIndex], index: nextIndex });
		requestAnimationFrame(() => setSwiping(0));
	};

	const handlers = useSwipeable({
		onSwipedLeft: () => switchNextImage('left'),
		onSwipedRight: () => switchNextImage('right'),
		onSwiping: e => setSwiping(e.deltaX),
		preventDefaultTouchmoveEvent: false,
		delta: 5
	});

	useEffect(() => {
		window.addEventListener('keydown', closeOnKeyDown);
		return () => window.removeEventListener('keydown', closeOnKeyDown);
	}, []);

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