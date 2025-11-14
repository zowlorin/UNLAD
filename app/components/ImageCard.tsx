"use client"

import { useGesture } from 'react-use-gesture';
import { animated, useSpring } from "@react-spring/web";

import Image, { ImageProps } from 'next/image';

import general_styles from '@/app/styles/general.module.css';

export default function ImageCard(props: ImageProps) {
	const AnimatedImage = animated(Image);
	const [{ x, y, rotateX, rotateY, scale }, api] = useSpring(() => ({
		x: 0,
		y: 0,
		rotateX: 0,
		rotateY: 0,
		scale: 1,
	}));

	const calc_x_rot = (mouseY: number, posY: number) => (mouseY - posY - window.innerHeight / 2) / 20;
	const calc_y_rot = (mouseX: number, posX: number) => -(mouseX - posX - window.innerWidth / 2) / 20;

	const bind = useGesture({
		onMove: (({ xy: [px, py], dragging }) => {
			if (!dragging) {
				api({
					rotateX: calc_x_rot(py, y.get()),
					rotateY: calc_y_rot(px, x.get()),
					scale: 1.2
				})
			}
		}),
		onHover: (({ hovering }) => {
			if (!hovering) {
				api({
					rotateX: 0,
					rotateY: 0,
					scale: 1
				})
			}
		})
	});

	return (
		<AnimatedImage
			{...props}
			{...bind()} 
			alt=''
			style={{ transform: 'perspective(600px)', rotateX, rotateY, scale }}
			className={`${general_styles.image_card}`}
		/>
	);
}