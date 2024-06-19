import React, { useCallback, useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { IconContext } from 'react-icons';
import { IoMdSend } from 'react-icons/io';

import useInput, { ValidationType } from '@/modules/common/hooks/useInput';

import UploadButton from './UploadButton';
import { toast } from 'react-toastify';
import { FaCirclePause } from 'react-icons/fa6';
import { useCreatePromptMutation } from '../../query';
import { isEmpty } from 'lodash';
import FilePreview from './FilePreview';
import { CacheFile } from '@/utils/cache-file';

const PromptInput: React.FC<{ selectedConversationId: string | null }> = ({
	selectedConversationId,
}) => {
	const [file, setFile] = useState<File | null>(null);

	const prompt = useInput(ValidationType.REQUIRED);

	const [createPrompt, { isError, isSuccess, error, isLoading }] =
		useCreatePromptMutation();

	const handleSetFile = useCallback((newFile: File | null) => {
		setFile(newFile);
		CacheFile.getInstance().file = newFile;
	}, []);

	const handleSubmitPrompt = (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			prompt.setIsTouched();

			if (!prompt.isValid) {
				prompt.inputRef.current.focus();
				return;
			}

			if (!selectedConversationId) {
				toast.error('There was an error during execution. Please try again.');
				prompt.inputRef.current.focus();
				return;
			}

			createPrompt({
				content: prompt.value,
				id: selectedConversationId,
				attachment: file,
			});
		} catch (error: any) {
			toast.error(
				error?.message ||
					'There was an error during execution. Please try again.',
			);
			prompt.inputRef.current.focus();
		}
	};

	useEffect(() => {
		const textarea = prompt.inputRef.current;
		if (textarea) {
			textarea.style.height = 'auto';
			const numberOfRows = Math.ceil((textarea.scrollHeight - 48) / 24) + 1;
			const renderedHeight = 48 + (numberOfRows - 1) * 24;
			textarea.style.height =
				renderedHeight > 208 ? '13rem' : `${renderedHeight}px`;
		}
	}, [prompt]);

	useEffect(() => {
		if (!isEmpty(error) || isError) {
			toast.error(
				(error as Error)?.message ||
					'There was an error during prompt submission. Please try again.',
			);
		}
		if (isSuccess) {
			setFile(null);
			prompt.resetValue();
		}
	}, [isError, isSuccess, error]);

	return (
		<div className="relative z-[5] mx-auto w-[70.5rem] shrink-0 pb-6 before:pointer-events-none before:absolute before:-top-6 before:bottom-1/2 before:left-0 before:right-6 before:bg-gradient-to-b before:from-secondary-color/0 before:to-secondary-color">
			<form
				onSubmit={handleSubmitPrompt}
				className="relative rounded-xl border-2 border-border-color"
			>
				<div className="relative flex min-h-[3.5rem] items-center px-16">
					<UploadButton onUploadFile={handleSetFile} allowUpload={!file} />
					<div className="flex grow flex-col items-start justify-start gap-3">
						<AnimatePresence>
							{file && (
								<FilePreview
									key="file-preview"
									file={file}
									onResetFile={() => handleSetFile(null)}
								/>
							)}
						</AnimatePresence>
						<textarea
							className="max-h-52 w-full shrink-0 resize-none overflow-y-auto scroll-smooth bg-transparent py-3 text-base text-white outline-none placeholder:text-grey"
							value={prompt.value}
							onChange={prompt.handleValueChange}
							onBlur={prompt.handleInputBlur}
							ref={prompt.inputRef}
							rows={1}
							placeholder="Ask anything"
							disabled={isLoading}
						></textarea>
					</div>
					{isLoading ? (
						<button
							type="button"
							disabled={true}
							className="absolute bottom-2 right-3 h-10 w-10"
						>
							<IconContext.Provider
								value={{
									style: {
										verticalAlign: 'middle',
										width: '1.5rem',
										height: '1.5rem',
										display: 'inline-block',
										fill: 'rgba(0, 132, 255)',
									},
								}}
							>
								<FaCirclePause />
							</IconContext.Provider>
						</button>
					) : (
						<button
							type="submit"
							disabled={!(prompt.isValid && prompt.isTouched)}
							className="group absolute bottom-2 right-3 h-10 w-10"
						>
							<IconContext.Provider
								value={{
									className:
										'transition-colors fill-grey group-hover:fill-accent-color-2',
									style: {
										verticalAlign: 'middle',
										width: '1.5rem',
										height: '1.5rem',
										display: 'inline-block',
										fill:
											prompt.isValid && prompt.isTouched
												? 'rgba(0, 132, 255)'
												: 'rgba(108, 114, 117)',
									},
								}}
							>
								<IoMdSend />
							</IconContext.Provider>
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default PromptInput;
