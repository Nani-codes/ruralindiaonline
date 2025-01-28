import React, { useState } from 'react';

function Faq(): JSX.Element {
	const [openItem, setOpenItem] = useState<number | null>(null);

	const handleItemClick = (index: number) => {
		if (openItem === index) {
			setOpenItem(null);
		} else {
			setOpenItem(index);
		}
	};

	const faqData = [
		{
			question: 'I live abroad can i send pari a donation',
			answer: 'Yes, you may. However, it must be only from an Indian bank account, in Indian rupees. We are currently not registered with FCRA for accepting foreign funds.',
		},
		{
			question: 'I sent PARI a donation. How do I get a receipt?',
			answer: 'ask them i dont know',
		},
	];

	return (
		<div className='max-w-md mx-auto '>
			<div className=''>
				<div className='bg-white-900  '>
					<div className=''></div>

					<div className='bg-white-100 py-8'>
						<div className='max-w-3xl mx-auto'>
							<h2 className='text-3xl font-semibold text-center mb-8'>Frequently Asked Questions</h2>

							<div className='space-y-4'>
								{faqData.map((item, index) => (
									<div key={index} className='border rounded-lg p-4'>
										<div className='flex justify-between'>
											<h3 className='text-lg font-semibold'>{item.question}</h3>
											<button
												onClick={() => handleItemClick(index)}
												className='text-blue-500 focus:outline-none'>
												{openItem === index ? (
													<svg
														className='w-5 h-5'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
														xmlns='http://www.w3.org/2000/svg'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth='2'
															d='M6 18L18 6M6 6l12 12'></path>
													</svg>
												) : (
													<svg
														className='w-5 h-5'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
														xmlns='http://www.w3.org/2000/svg'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth='2'
															d='M19 9l-7 7-7-7'></path>
													</svg>
												)}
											</button>
										</div>
										{openItem === index && <p className='mt-2'>{item.answer}</p>}
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='flex justify-center items-center mt-4'></div>
				</div>
			</div>
		</div>
	);
}

export default Faq;
