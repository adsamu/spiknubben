export const animations = {
	bl: {
		initial: { y: "100%", opacity: 0 },
		animate: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", bounce: 0.4, duration: 0.6 },
		},
		exit: {
			x: "-100%",
			opacity: 0,
			transition: { type: "spring", bounce: 0.3, duration: 0.5 },
		},
	},

	rl: {
		initial: { x: "100%", opacity: 0 },
		animate: {
			x: 0,
			opacity: 1,
			transition: { type: "spring", bounce: 0.4, duration: 0.6 },
		},
		exit: {
			x: "-100%",
			opacity: 0,
			transition: { type: "spring", bounce: 0.3, duration: 0.5 },
		},
	},
};

