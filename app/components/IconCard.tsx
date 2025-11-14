"use client"

import { RefAttributes, ForwardRefExoticComponent, useEffect } from 'react';

import { useGesture } from 'react-use-gesture';
import { animated, useSpring } from "@react-spring/web";

import { LucideProps } from "lucide-react";

import styles from '@/app/styles/card.module.css';

type CardProps = {
	Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
	header_text: string,
	description: string,
}

export default function Card({ Icon, header_text, description } : CardProps ) {
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
					scale: 1.05
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
		<animated.div {...bind()} style={{ transform: 'perspective(600px)', rotateX, rotateY, scale }} className={`${styles.card}`}>
			<Icon size={25} color='#fff6f2'/>
			<h1 className={`${styles.card_header}`}>{header_text}</h1>
			<p className={`${styles.card_text}`}>{description}</p>
			<Icon size={90} color='#5b6062' opacity={0.45} className={`${styles.card_icon}`} />
		</animated.div>
	);
}