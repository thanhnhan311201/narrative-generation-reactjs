import React from 'react';

import { IconContext } from 'react-icons';
import { IoIosLogIn } from 'react-icons/io';

import { useAppDispatch, useAppSelector } from '@/store';
import { openSigninDialog } from '../state/auth.slice';

import { AUTHENTICATION_STATUS } from '../utils';

const SigninContainer: React.FC = () => {
	const { authStatus } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();

	const handleOpenSigninDialog = () => {
		dispatch(openSigninDialog());
	};

	return (
		authStatus !== AUTHENTICATION_STATUS.AUTHENTICATED && (
			<div className="absolute bottom-0 left-0 right-0 bg-main-bg px-4 pb-6">
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
			</div>
		)
	);
};

export default SigninContainer;
