import './Snackbar.module.css'; // Import your custom styles

import React, { useEffect, useState } from 'react';
interface CustomSnackbarProps {
	message?: string; // Make message optional
	type?: string; // Make type optional
	onClose: () => void;
}
const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ message = 'Default message', type, onClose }) => {
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsOpen(false);
			onClose();
		}, 3000);

		return () => clearTimeout(timeout);
	}, [onClose]);

	return (
		<div className={`custom-snackbar ${type} ${isOpen ? 'open' : ''}`}>
			<span className='message'></span>
		</div>
	);
};

export default CustomSnackbar;
