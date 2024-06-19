import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import { FileStorage } from '@/storage/indexDB';

type PromptProps = {
	userProfilePhoto: string;
	prompt: { content: string; attachment: string | null };
};

const Prompt: React.FC<PromptProps> = ({ userProfilePhoto, prompt }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.25 }}
			className="ml-auto max-w-[50rem]"
		>
			<div className="border-3 space-y-6 rounded-[1.25rem] border-transparent bg-[rgba(52,56,57,.5)] px-6 pb-16 pt-6">
				<span className='font-["Inter"] text-base font-semibold text-white'>
					{prompt.content}
				</span>
			</div>
			<div className="-mt-8 flex items-end justify-end pr-6">
				<div className="relative h-16 w-16 overflow-hidden rounded-2xl shadow-[0_0_0_0.25rem_#232627]">
					<img
						className="inline-block w-full object-cover align-top"
						src={userProfilePhoto}
						alt="User avatar"
						referrerPolicy="no-referrer"
						crossOrigin="anonymous"
						loading="lazy"
						decoding="async"
					/>
				</div>
			</div>
		</motion.div>
	);
};

export default Prompt;
