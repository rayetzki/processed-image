
import css from './FullImage.module.css';
import Image from 'next/image';

interface FullImageProps {
	image: string;
	isOpen: boolean;
	setOpen: (newValue: boolean) => void;
}

export default function FullImage({
	isOpen,
	setOpen,
	image
}: FullImageProps) {
	return isOpen ? (
		<div className={css.Overlay} onClick={() => setOpen(!isOpen)}>
			<Image 
				src={image}
				layout='fill'
				objectFit='contain'
				className={css.FullImage}
				alt='Картинка в полный экран'
			/>
		</div>
	) : null;
}