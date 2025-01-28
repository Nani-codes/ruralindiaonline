import { Autocomplete, Button, ButtonProps, colorsTuple, createTheme as createThemeCore, Input, Pill } from '@mantine/core';

import buttonClasses from './mantine_components/Themes/Button.module.css';

export const createTheme = ({ fontFamily }: { fontFamily: string }) =>
	createThemeCore({
		primaryColor: 'pari-red',
		primaryShade: 7,
		colors: {
			'pari-red': [
				'#ffecec',
				'#f9d7d7',
				'#edaeae',
				'#e28181',
				'#d85c5b',
				'#d34443',
				'#d13737',
				'#ba2929', // 7 - main color
				'#a62224',
				'#92181c',
			],
			yellow: colorsTuple('#F2C94C'),
			'pari-blue': colorsTuple('#2F80ED'),
		},
		fontFamily,
		fontFamilyMonospace: 'Monaco, Courier, monospace',
		headings: {
			fontFamily,
			sizes: {
				h1: { fontSize: '3.5rem', lineHeight: '1.2' },
				h2: { fontSize: '2rem', lineHeight: '1.3' },
				h3: { fontSize: '1.75rem', lineHeight: '1.4' },
				h4: { fontSize: '1.5rem', lineHeight: '1.5' },
				h5: { fontSize: '1.25rem', lineHeight: '1.6' },
				h6: { fontSize: '1rem', lineHeight: '1.7' },
			},
		},
		breakpoints: {
			xss: '18rem',
			xs: '20rem',
			sm: '40rem',
			md: '48rem',
			lg: '64rem',
			xl: '80rem',
			xl2: '96rem',
		},
		components: {
			Input: Input.extend({
				defaultProps: {
					radius: 'lg',
				},
			}),
			Button: Button.extend({
				classNames: buttonClasses,
				defaultProps: {
					variant: 'filled',
				},
				vars: (theme, props: ButtonProps) => {
					if (props.variant === 'outline-inverted-hover') {
						const color = props.color ?? theme.primaryColor;
						const bgProp = props.bg;
						let bg = bgProp?.toString();
						if (bg) {
							const themeBg = theme.colors[bg];
							if (themeBg) {
								bg = themeBg[7];
							}
						}
						return {
							root: {
								'--button-bg': bg,
								'--button-color': color,
							},
						};
					} else if (props.variant === 'outline-hover-filled') {
						const color = props.color ?? theme.primaryColor;
						const bgProp = props.bg ?? theme.primaryColor;
						let bg = bgProp?.toString();
						if (bg) {
							const themeBg = theme.colors[bg];
							if (themeBg) {
								bg = themeBg[7];
							}
						}
						return {
							root: {
								'--button-bg': bg,
								'--button-color': color,
							},
						};
					}

					return { root: {} };
				},
			}),
			Pill: Pill.extend({
				defaultProps: {
					radius: 'md',
					px: '12px',
					c: 'pari-red',
					bg: 'white',
				},
				styles: {
					root: {
						color: 'pari-red',
						borderColor: 'pari-red',
						border: '1px solid',
						borderRadius: '2rem',
						height: '23px',
					},
				},
			}),
			Autocomplete: Autocomplete.extend({
				defaultProps: {
					radius: 'lg',
				},
				styles: {
					dropdown: {
						borderRadius: '2rem',
					},
					options: {
						borderRadius: '2rem',
					},
					option: {
						borderRadius: '2rem',
						padding: '12px',
					},
				},
			}),
		},
	});
