import React from 'react';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: JSX.Element;
	helperText?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { icon, className, helperText, ...inputProps } = props;

	return (
		<div>
			<div className="relative">
				<input
					ref={ref}
					className={classNames(
						className,
						'font-base h-[3.25rem] w-full px-4 font-medium text-main-text-color transition-colors',
						icon ? 'pl-[3.125rem] pr-3.5' : '',
					)}
					{...inputProps}
				/>
				{icon && (
					<div className="pointer-events-none absolute left-4 top-2/4 inline-block h-6 w-6 -translate-y-2/4 transition-colors">
						{icon}
					</div>
				)}
			</div>
			<AnimatePresence>
				{helperText && (
					<motion.div
						key="helper-text"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="font-base mt-2"
					>
						{helperText}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
});

Input.displayName = 'Input';
export default Input;
