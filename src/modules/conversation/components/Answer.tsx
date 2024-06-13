import React from 'react';

import { motion } from 'framer-motion';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AnswerLoading from './AnswerLoading';

type AnswerProps = {
	answer: { content: string };
};

const Answer: React.FC<AnswerProps> = ({ answer }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.25 }}
			className="max-w-[50rem]"
		>
			<div className="prose max-w-none space-y-4 rounded-[1.25rem] bg-main-bg px-6 pb-16 pt-6 text-white prose-headings:text-white prose-strong:text-white">
				<Markdown remarkPlugins={[remarkGfm]}>{answer.content}</Markdown>
			</div>
			<div className="-mt-8 flex items-end justify-start pl-6">
				<div className="relative h-16 w-16 overflow-hidden rounded-2xl shadow-[0_0_0_0.25rem_#232627]">
					<img
						className="inline-block w-full object-cover align-top"
						src="/images/system.webp"
						alt="system"
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

export default Answer;
