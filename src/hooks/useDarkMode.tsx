import { useEffect, useState } from 'react';

function useDarkMode() {
	const [theme, setTheme] = useState((typeof window !== 'undefined' && localStorage.theme) ?? 'light');
	const changeTheme = (mode: string) => {
		const root = window.document.documentElement;
		root.style.setProperty('--initial-color-mode', mode);
		root.setAttribute('data-theme', mode);
		setTheme(mode);
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', mode);
		}
	};

	useEffect(() => {
		changeTheme(theme);
	}, [theme]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
				const newColorScheme = event.matches ? 'light' : 'light';
				changeTheme(newColorScheme);
			});
		}
	}, []);

	return [theme, setTheme] as const;
}

export default useDarkMode;
