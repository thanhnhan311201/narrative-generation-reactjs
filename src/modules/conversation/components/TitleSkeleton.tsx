import React from 'react';

const TitleSkeleton: React.FC = () => {
	return (
		<div className="w-80">
			<div className="animate-pulse">
				<div className="h-[1.25rem] rounded bg-slate-700"></div>
			</div>
		</div>
	);
};

export default TitleSkeleton;
