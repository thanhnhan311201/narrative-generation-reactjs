import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { FaFile, FaXmark } from 'react-icons/fa6';

const imgTypes = ['image/jpeg', 'image/png'];

const FilePreview: React.FC<{ file: File; onResetFile: () => void }> = ({
	file,
	onResetFile,
}) => {
	const [previewImgUrl, setPreviewImgUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!imgTypes.includes(file.type)) {
			return;
		}

		const url = URL.createObjectURL(file);
		setPreviewImgUrl(url);

		return () => {
			previewImgUrl && URL.revokeObjectURL(url);
		};
	}, []);

	return (
		<div className="mt-3 flex items-center justify-start gap-4">
			{imgTypes.includes(file.type) && previewImgUrl ? (
				<motion.div
					key={file.name}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.25 }}
					className="relative h-20 w-20 rounded-xl"
				>
					<img
						className="h-full w-full rounded-xl object-cover"
						src={previewImgUrl}
						alt="upload-image"
						referrerPolicy="no-referrer"
						crossOrigin="anonymous"
						loading="lazy"
						decoding="async"
					/>
					<button
						className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white fill-modal__close-btn-fill-color hover:fill-primary-color"
						onClick={onResetFile}
						type="button"
					>
						<IconContext.Provider
							value={{
								className: 'transition-colors',
								style: {
									verticalAlign: 'middle',
									width: '.75rem',
									height: '.75rem',
									fill: 'inherit',
								},
							}}
						>
							<FaXmark />
						</IconContext.Provider>
					</button>
				</motion.div>
			) : (
				<motion.div
					key={file.name}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.25 }}
					className="relative flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-xl bg-main-bg pt-2 font-['Inter'] text-base font-bold text-white"
				>
					<IconContext.Provider
						value={{
							className: 'fill-white',
							style: {
								verticalAlign: 'middle',
								width: '1.5rem',
								height: '1.5rem',
							},
						}}
					>
						<FaFile />
					</IconContext.Provider>
					<span className="uppercase">{file.type.split('/')[0]}</span>
					<button
						className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white fill-modal__close-btn-fill-color hover:fill-primary-color"
						onClick={onResetFile}
						type="button"
					>
						<IconContext.Provider
							value={{
								className: 'transition-colors',
								style: {
									verticalAlign: 'middle',
									width: '.75rem',
									height: '.75rem',
									fill: 'inherit',
								},
							}}
						>
							<FaXmark />
						</IconContext.Provider>
					</button>
				</motion.div>
			)}
		</div>
	);
};

export default FilePreview;
