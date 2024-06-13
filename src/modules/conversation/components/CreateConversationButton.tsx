import React from 'react';

import { IconContext } from 'react-icons';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { motion } from 'framer-motion';

import { openCreateConversationDialog } from '@/modules/common/state/dialog.slice';
import { useAppDispatch } from '@/store';

const CreateConversationButton: React.FC = () => {
	const dispatch = useAppDispatch();

	return (
		<motion.div
			key="create-conversation-button"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<button
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
			</button>
		</motion.div>
	);
};

export default CreateConversationButton;
