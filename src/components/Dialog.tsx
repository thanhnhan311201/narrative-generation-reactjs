import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { AnimatePresence, motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { FaXmark } from 'react-icons/fa6';

const Dialog: React.FC<{
	onClose: () => void;
	isOpen: boolean;
	isDisplayCloseBtn?: boolean;
	style?: React.CSSProperties;
	children: React.ReactNode;
}> = ({ onClose, isOpen, style, children, isDisplayCloseBtn }) => {
	useEffect(() => {
		const closeModal = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			window.addEventListener('keydown', closeModal);
		} else {
			window.removeEventListener('keydown', closeModal);
		}
		return () => window.removeEventListener('keydown', closeModal);
	}, [isOpen]);

	return (
		<>
			{ReactDOM.createPortal(
				<AnimatePresence>
					{isOpen ? (
						<motion.div
							key="modal"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
							className="fixed inset-0 z-50 flex items-center justify-center p-6 md:!p-0 md:px-4"
							role="dialog"
							aria-modal="true"
						>
							<motion.div
								key="backdrop"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.25 }}
								onClick={onClose}
								className="bg-overlay-color fixed inset-0"
								aria-hidden="true"
							/>
							<motion.div
								key="dialog"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.25 }}
								className="relative z-10"
								style={style}
							>
								{children}
								{isDisplayCloseBtn && (
									<button
										className="fill-modal__close-btn-fill-color hover:fill-modal__close-btn-fill-hover-color bg-modal__close-btn-bg-color absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full"
										onClick={onClose}
									>
										<IconContext.Provider
											value={{
												className: 'transition-colors',
												style: {
													verticalAlign: 'middle',
													width: '1.5rem',
													height: '1.5rem',
													fill: 'inherit',
												},
											}}
										>
											<FaXmark />
										</IconContext.Provider>
									</button>
								)}
							</motion.div>
						</motion.div>
					) : (
						<></>
					)}
				</AnimatePresence>,
				document.getElementById('modal-root') as Element,
			)}
		</>
	);
};

export default Dialog;
