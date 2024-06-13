import React from 'react';

const ConversationSkeleton: React.FC = () => {
	return (
		<div className="h-full w-full">
			<div className="flex animate-pulse flex-col justify-start space-x-4">
				<div className="ml-auto w-[50rem]">
					<div className="border-3 space-y-6 rounded-[1.25rem] border-transparent bg-[rgba(52,56,57,.5)] px-6 pb-16 pt-6">
						<div className="h-2 rounded bg-slate-700"></div>
						<div className="h-2 rounded bg-slate-700"></div>
					</div>
					<div className="-mt-8 flex items-end justify-end pr-6">
						<div className="h-16 w-16 overflow-hidden rounded-2xl bg-[rgba(52,56,57)] shadow-[0_0_0_0.25rem_#232627]"></div>
					</div>
				</div>
				<div className="w-[50rem]">
					<div className="space-y-4 rounded-[1.25rem] bg-main-bg px-6 pb-16 pt-6">
						<div className="h-2 w-1/2 rounded bg-slate-700"></div>
						<div className="h-2 rounded bg-slate-700"></div>
						<div className="h-2 rounded bg-slate-700"></div>
						<br />
						<div className="h-2 w-3/4 rounded bg-slate-700"></div>
						<div className="h-2 rounded bg-slate-700"></div>
						<div className="h-2 rounded bg-slate-700"></div>
						<br />
						<div className="h-2 w-3/4 rounded bg-slate-700"></div>
						<div className="h-2 rounded bg-slate-700"></div>
						<div className="h-2 rounded bg-slate-700"></div>
						<br />
						<br />
						<div className="h-2 rounded bg-slate-700"></div>
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
				</div>
			</div>
		</div>
	);
};

export default ConversationSkeleton;
