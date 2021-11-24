import { useState } from "react";
import Image from "next/image";
import { City, FullScreenView } from "../types";
import cx from 'classnames';
import css from "./City.module.css";

interface CityProps extends City {
	setFullScreen: (view: FullScreenView) => void;
}

export function City({
	city,
	short,
	date,
	id,
	description,
	images,
	setFullScreen,
}: CityProps) {
	const [isExpanded, setExpanded] = useState(false);
	
	return (
		<li id={`#${id}`} key={city} className={css.Stepper__Item}>
			<div className={css.Stepper__Content}>
				<h2 className={css.Stepper__Title}>{city}</h2>
				<h3 className={css.Stepper__Short}>{short}</h3>
				<p onClick={() => setExpanded(!isExpanded)} title="Развернуть описание" className={cx(css.Stepper__Description, {
					[css.Stepper__Description_Expanded]: isExpanded
				})}>
					{description}
				</p>
				<div className={css.Stepper__Images}>
					{images?.slice(0, 6).map((image, index) => (
						<Image
							className={css.Stepper__Image}
							key={image.secure_url}
							src={image.secure_url}
							onClick={() =>
								setFullScreen({
									image: image.secure_url,
									images: images.map(i => i.secure_url),
									isOpen: true,
								})
							}
							loading="lazy"
							layout="intrinsic"
							width={300}
							height={300}
							onContextMenu={e => e.preventDefault()}
							objectFit="cover"
							alt={`${index}-я картинка из города ${city}`}
						/>
					))}
				</div>
			</div>
			<time className={css.Stepper__Time}>{date}</time>
		</li>
	);
}
