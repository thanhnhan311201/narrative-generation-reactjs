import React, { useCallback, useEffect } from 'react';

import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import { useAppDispatch, useAppSelector } from '@/store';
import { closeCreateConversationDialog } from '@/modules/common/state/dialog.slice';
import { useCreateConversationMutation } from '../query';

import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import useInput, { ValidationType } from '@/modules/common/hooks/useInput';
import { IconContext } from 'react-icons';
import { BiSolidConversation } from 'react-icons/bi';
import classNames from 'classnames';

const CreateConversationDialog: React.FC = () => {
	const { isCreateConversationDialogOpen } = useAppSelector(
		(state) => state.dialog,
	);

	const title = useInput(ValidationType.REQUIRED);

	const dispatch = useAppDispatch();

	const handleCloseCreateConversationDialog = useCallback(() => {
		dispatch(closeCreateConversationDialog());
	}, []);

	const [createConversation, { isError, isSuccess, error }] =
		useCreateConversationMutation();

	const handleCreateConversation = (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			title.setIsTouched();

			if (!title.isValid) {
				title.inputRef.current!.focus();
				return;
			}

			createConversation({ title: title.value });
		} catch (error: any) {
			toast.error(
				error?.message ||
					'There was an error during conversation creation. Please try again.',
			);
		}
	};

	useEffect(() => {
		if (!isEmpty(error) || isError) {
			toast.error(
				(error as Error)?.message ||
					'There was an error during conversation creation. Please try again.',
			);
		}
		if (isSuccess) {
			dispatch(closeCreateConversationDialog());
		}
	}, [isError, isSuccess, error, dispatch]);

	useEffect(() => {
		if (!isCreateConversationDialogOpen) {
			title.resetValue();
		}
	}, [isCreateConversationDialogOpen]);

	return (
		<Dialog
			isOpen={isCreateConversationDialogOpen}
			onClose={handleCloseCreateConversationDialog}
		>
			<div className="w-[30rem] rounded-3xl bg-modal p-8">
				<form
					onSubmit={handleCreateConversation}
					className="flex h-full w-full flex-col justify-start gap-6"
				>
					<div className="flex flex-col items-center justify-start gap-2 text-white">
						<h2 className="font-['Inter'] text-2xl font-bold">
							Create conversation
						</h2>
					</div>
					<div className="flex flex-col justify-start gap-2">
						<div className="font-base font-semibold text-main-text-color">
							Title
						</div>
						<Input
							className={classNames(
								'rounded-xl border-2 bg-secondary-color !text-base outline-none transition-colors placeholder:text-grey/50 focus:bg-transparent',
								!title.isValid && title.isTouched
									? 'border-accent-color-1'
									: 'border-secondary-color',
							)}
							placeholder="Title"
							type="text"
							value={title.value}
							onChange={title.handleValueChange}
							onBlur={title.handleInputBlur}
							ref={title.inputRef}
							helperText={
								title.errMessage ? (
									<span className="text-accent-color-1">
										{title.errMessage}
									</span>
								) : null
							}
							icon={
								<IconContext.Provider
									value={{
										style: {
											verticalAlign: 'middle',
											width: '1.5rem',
											height: '1.5rem',
											fill: title.value
												? 'rgba(108, 114, 117)'
												: 'rgba(108, 114, 117, 0.5)',
										},
									}}
								>
									<BiSolidConversation />
								</IconContext.Provider>
							}
						/>
					</div>
					<button
						className={classNames(
							'font-base flex h-12 w-full items-center justify-center rounded-xl bg-accent-color-2 px-[1.375rem] font-semibold text-white transition-colors',
							title.isValid && title.isTouched ? '' : 'opacity-20',
						)}
						type="submit"
						disabled={!(title.isValid && title.isTouched)}
					>
						Create conversation
					</button>
				</form>
			</div>
		</Dialog>
	);
};

export default CreateConversationDialog;
