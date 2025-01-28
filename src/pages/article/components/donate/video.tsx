import React, { useState } from 'react';

function Video(): JSX.Element {
	return (
		<div className='max-w-xs mx-auto rounded-xl overflow-hidden shadow-lg bg-white'>
			<div className=''>
				<div className='bg-gray-900 p-20 rounded-lg text-white'>
					<div className='relative aspect-w-16 aspect-h-9'>
						<video id='videoPlayer' className='absolute inset-0 w-full object-cover h-[300px]' controls>
							Your browser does not support the video tag.
						</video>
					</div>
					<div className='flex justify-center items-center mt-4'>
						<button id='playPauseButton' className='px-2 py-2 bg-red-500 text-white rounded-full'>
							Play
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Video;
