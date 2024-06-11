import React from 'react';

import { IconContext } from 'react-icons';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';

import { openCreateConversationDialog } from '@/modules/common/state/dialog.slice';
import { useAppDispatch, useAppSelector } from '@/store';

import { AUTHENTICATION_STATUS } from '@/modules/auth/utils';

const CreateConversationButton: React.FC = () => {
	const { authStatus } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();

	return (
		<AnimatePresence>
			{authStatus === AUTHENTICATION_STATUS.AUTHENTICATED ? (
				<motion.button
					key="create-conversation-button"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className="group"
					onClick={() => dispatch(openCreateConversationDialog())}
				>
					<IconContext.Provider
						value={{
							style: {
								verticalAlign: 'middle',
								width: '1.5rem',
								height: '1.5rem',
							},
						}}
					>
						<FaRegPenToSquare className="fill-grey transition-colors group-hover:fill-white--1" />
					</IconContext.Provider>
				</motion.button>
			) : (
				<div></div>
			)}
		</AnimatePresence>
	);
};

export default CreateConversationButton;
