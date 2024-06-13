import React from 'react';

import { Tooltip } from 'react-tooltip';
import classNames from 'classnames';

import { toast } from 'react-toastify';
import { IconContext } from 'react-icons';
import { CgAttachment } from 'react-icons/cg';

import { MAX_FILE_SIZE } from '../../utils';

export const validTypes = [
	'image/jpeg',
	'image/png',
	'audio/mpeg',
	'text/plain',
	'text/html',
	'text/javascript',
	'application/json',
	'video/mp4',
];

const UploadButton: React.FC<{
	onUploadFile: (newFile: File | null) => void;
	allowUpload: boolean;
}> = ({ onUploadFile, allowUpload }) => {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (!validTypes.includes(file.type)) {
				toast.error(
					'Invalid file type. Only JPEG, PNG, TXT, MP3, HTML, JavaScript, JSON and MP4 files are allowed.',
				);
				onUploadFile(null);
			} else if (file.size > MAX_FILE_SIZE) {
				toast.error('File size exceeds 5MB limit.');
				onUploadFile(null);
			} else {
				onUploadFile(file);
			}
		}
	};

	return (
		<button
			type="button"
			className="group absolute bottom-2 left-3 z-10 h-10 w-10 outline-none"
			disabled={!allowUpload}
			data-tooltip-id="upload-button"
			data-tooltip-content="Only a single file is supported"
			data-tooltip-place="top"
		>
			{!allowUpload && <Tooltip id="upload-button" />}
			<input
				type="file"
				name="prompt-file"
				id="prompt-file"
				className="hidden"
				onChange={handleFileChange}
				disabled={!allowUpload}
				value=""
			/>
			<label
				className={classNames(
					'flex h-full w-full items-center justify-center',
					allowUpload ? 'cursor-pointer' : '',
				)}
				htmlFor="prompt-file"
			>
				<IconContext.Provider
					value={{
						className: classNames(
							'transition-colors fill-grey [&>path]:fill-inherit',
							allowUpload ? 'group-hover:fill-accent-color-2' : '',
						),
						style: {
							verticalAlign: 'middle',
							width: '1.75rem',
							height: '1.75rem',
							display: 'inline-block',
						},
					}}
				>
					<CgAttachment />
				</IconContext.Provider>
			</label>
		</button>
	);
};

export default UploadButton;
