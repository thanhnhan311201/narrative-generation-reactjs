import React from 'react';

import { IconContext } from 'react-icons';
import { IoIosLogIn } from 'react-icons/io';
import { motion } from 'framer-motion';

import { useAppDispatch } from '@/store';
import { openSigninDialog } from '@/modules/common/state/dialog.slice';

const SigninContainer: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleOpenSigninDialog = () => {
		dispatch(openSigninDialog());
	};

	return (
		<div className="absolute bottom-0 left-0 right-0 bg-main-bg px-4 pb-6">
			<motion.div
				key="sigin-button"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 50 }}
				transition={{ duration: 0.25 }}
			>
				<button
					className="font-base group relative flex h-10 w-full items-center justify-center rounded-xl border-[0.0625rem] border-transparent bg-white font-semibold text-primary-color hover:border-white hover:bg-main-bg hover:text-white"
					onClick={() => handleOpenSigninDialog()}
				>
					<div className="flex items-center gap-3">
						<IconContext.Provider
							value={{
								className:
									'fill-primary-color group-hover:fill-white transition-colors',
								style: {
									verticalAlign: 'middle',
									width: '1.5rem',
									height: '1.5rem',
								},
							}}
						>
							<IoIosLogIn />
						</IconContext.Provider>
						<span className="transition-colors">Signin</span>
					</div>
				</button>
			</motion.div>
		</div>
	);
};

export default SigninContainer;
