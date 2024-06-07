import React from 'react';

import { IconContext } from 'react-icons';
import { BsCircleFill } from 'react-icons/bs';

const UserProfile: React.FC = () => {
	return (
		<div className="bg-main-bg absolute bottom-0 left-0 right-0 px-4 pb-6 before:pointer-events-none before:absolute before:bottom-full before:left-0 before:right-0 before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[rgba(19,22,23,0)]">
			<div className="w-full shadow-[0_1.25rem_1.5rem_0_rgba(0,0,0,0.5)]">
				<div className="bg-secondary-color w-full rounded-xl p-[1.25rem]">
					<div className="flex items-center gap-4">
						<div className="relative h-10 shrink-0 basis-10">
							<img
								className="w-full rounded-full"
								src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-1/437918699_3781431168759185_919186230840647234_n.jpg?stp=dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YSAu2Ddpc6EQ7kNvgGePJYH&_nc_ht=scontent.fsgn5-9.fna&oh=00_AYAYOTLa2mjWjOH_la28r0CrNkXqLXjqpZX63E8CoOlTOA&oe=665D2BFF"
								alt="User avatar"
								referrerPolicy="no-referrer"
								crossOrigin="anonymous"
							/>
							<IconContext.Provider
								value={{
									style: {
										position: 'absolute',
										width: '1.125rem',
										height: '1.125rem',
										color: '#46ab5e',
										bottom: -2,
										right: -2,
										border: '4px solid #232627',
										borderRadius: '50%',
									},
								}}
							>
								<BsCircleFill />
							</IconContext.Provider>
						</div>
						<div className="font-base flex grow flex-col items-start justify-center gap-[.375rem] overflow-hidden font-semibold">
							<div className="w-full truncate text-sm text-white">
								Phan Nguyễn Thành Nhân
							</div>
							<div className="text-white--1 w-full truncate text-xs">
								nhanpnt.dev@gmail.com
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
