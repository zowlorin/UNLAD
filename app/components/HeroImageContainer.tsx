"use client"

import Image, { ImageProps } from 'next/image';

import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';

import general_styles from '@/app/styles/general.module.css'
import styles from '@/app/styles/card.module.css';

type RevisedImageProps = Omit<ImageProps, "src">
type HeroImageProps = RevisedImageProps & { src : Array<string> }

export default function HeroImageContainer( { src, ...ImageProps } : HeroImageProps ) {
	const AnimatedImage = animated(Image);

	const [clicked, toggle_clicked] = useState<boolean>(false);
	const [index, set_index] = useState<number>(0);

	const animation_duration = 500;
	const { n } = useSpring({
		from: { n: 0, m: 0 },
		n: clicked ? 1 : 0,
		config: { duration: animation_duration }
	});

	const keyframes = {
		opacity: n.to({
			range: [0, 0.5],
			output: [1, 0]
		}),
		x: n.to({
			range: [0, 1],
			output: [0, -100],
		})
	}

	// const HandleClick = (event: React.MouseEvent<HTMLDivElement>) => {
	// 	const i = event.target.id;

	// 	if (i !== index) {
	// 		toggle_clicked(true);
			
	// 		setTimeout(() => { set_index(i) }, animation_duration/2);
	// 		setTimeout(() => { toggle_clicked(false) }, animation_duration/2)
	// 	}
	// }

	return (
		<div>
			<AnimatedImage
				{...ImageProps}
				src={src[index]}
				style={keyframes}
			/>
			<div className={`${general_styles.horizontal_align} ${general_styles.center}`}>
				{(src.length > 1) && (src.map((val, i) => (
					<div
						key={i}
						id={i.toString()}
						className={`${styles.hero_selector}`}
						style={{ width: (0.20 * window.innerWidth)/(src.length) - 20 }}
						// onClick={(event) => HandleClick(event)}
					/>
				)))}
			</div>
		</div>
	);
}