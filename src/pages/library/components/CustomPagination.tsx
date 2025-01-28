import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
interface CustomPaginationProps {
	room: string; // Replace YourRoomType with the actual type of your 'room' variable
	type: string; // Replace with the actual type
	tab: string; // Replace with the actual type
	pageCount: number; // Replace with the actual type
	initialPage: number; // Replace with the actual type
	breakLabel?: string;
	pageRangeDisplayed?: number;
}
const CustomPagination: React.FC<CustomPaginationProps> = ({
	room,
	type,
	tab,
	pageCount,
	initialPage,
	breakLabel = '...',
	pageRangeDisplayed = 5,
}) => {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(initialPage);

	useEffect(() => {
		const pageQueryParam = router.query.page;
		const newPage = Array.isArray(pageQueryParam)
			? parseInt(pageQueryParam[0], 10)
			: pageQueryParam
				? parseInt(pageQueryParam, 10)
				: initialPage;

		setCurrentPage(newPage);
	}, [router.query.page, initialPage]);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
		router.push({
			pathname: 'library',
			query: { ...router.query, page: newPage },
		});
	};

	const renderPageNumbers = () => {
		const pages = [];
		for (let i = 1; i <= pageCount; i++) {
			if (
				i === 1 ||
				i === pageCount ||
				(i >= currentPage - Math.floor(pageRangeDisplayed / 2) && i <= currentPage + Math.floor(pageRangeDisplayed / 2))
			) {
				const isCurrentPage = i === currentPage;

				pages.push(
					<div key={i} className='page-number ' style={{ padding: '12px' }}>
						{isCurrentPage ? (
							<button onClick={() => handlePageChange(i)} style={{ fontWeight: 'bold', position: 'relative' }}>
								<svg width='57' height='44' viewBox='0 0 57 44' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<rect x='1' y='1' width='55' height='42' rx='21' fill='#EB5757' />
									<rect x='1' y='1' width='55' height='42' rx='21' stroke='#B82929' strokeWidth='2' />
									<text
										x='50%'
										y='50%'
										dominantBaseline='middle'
										textAnchor='middle'
										fill='white'
										fontSize='16'
										fontWeight='bold'>
										{i}
									</text>
								</svg>
							</button>
						) : (
							<button onClick={() => handlePageChange(i)} style={{ fontWeight: 'normal', color: '#B82929' }}>
								<text x='60%' y='80%' textAnchor='middle' fill='#B82929' fontSize='16' fontWeight='bold'>
									{i}
								</text>
							</button>
						)}
					</div>,

					//   <button
					//     key={i}
					//     onClick={() => handlePageChange(i)}
					//     style={{ fontWeight: i === currentPage ? 'bold' : 'normal' }}
					//   >
					//     {i}
					//   </button>
				);
			}
		}
		return pages;
	};

	return (
		<div className='flex items-center justify-center'>
			<button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='pagination-button'>
				<svg width='103' height='44' viewBox='0 0 103 44' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<rect x='1' y='1' width='101' height='42' rx='21' stroke='#B82929' strokeWidth='2' />
					<path
						d='M36.5 27L31.5 22L36.5 17'
						stroke='#B82929'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M52.425 16.79C53.825 16.79 54.845 17.075 55.485 17.645C56.125 18.205 56.445 18.99 56.445 20C56.445 20.45 56.37 20.88 56.22 21.29C56.08 21.7 55.845 22.07 55.515 22.4C55.185 22.72 54.745 22.975 54.195 23.165C53.655 23.345 52.99 23.435 52.2 23.435H51.045V27.5H49.425V16.79H52.425ZM52.305 18.155H51.045V22.07H52.02C52.63 22.07 53.14 22.005 53.55 21.875C53.96 21.735 54.265 21.52 54.465 21.23C54.675 20.93 54.78 20.54 54.78 20.06C54.78 19.42 54.58 18.945 54.18 18.635C53.79 18.315 53.165 18.155 52.305 18.155ZM62.1196 19.265C62.2596 19.265 62.4146 19.275 62.5846 19.295C62.7546 19.305 62.8946 19.32 63.0046 19.34L62.8396 20.825C62.7296 20.795 62.5996 20.77 62.4496 20.75C62.2996 20.73 62.1596 20.72 62.0296 20.72C61.7296 20.72 61.4396 20.78 61.1596 20.9C60.8896 21.01 60.6446 21.175 60.4246 21.395C60.2046 21.605 60.0296 21.865 59.8996 22.175C59.7796 22.485 59.7196 22.84 59.7196 23.24V27.5H58.1296V19.415H59.3896L59.5996 20.855H59.6596C59.8296 20.565 60.0346 20.3 60.2746 20.06C60.5146 19.82 60.7896 19.63 61.0996 19.49C61.4096 19.34 61.7496 19.265 62.1196 19.265ZM67.0887 19.265C67.7987 19.265 68.4087 19.415 68.9187 19.715C69.4287 20.005 69.8187 20.425 70.0887 20.975C70.3687 21.525 70.5087 22.175 70.5087 22.925V23.795H65.0787C65.0987 24.625 65.3137 25.26 65.7237 25.7C66.1437 26.14 66.7287 26.36 67.4787 26.36C67.9987 26.36 68.4587 26.315 68.8587 26.225C69.2687 26.125 69.6887 25.98 70.1187 25.79V27.11C69.7187 27.29 69.3087 27.425 68.8887 27.515C68.4787 27.605 67.9887 27.65 67.4187 27.65C66.6387 27.65 65.9487 27.495 65.3487 27.185C64.7487 26.875 64.2787 26.415 63.9387 25.805C63.6087 25.185 63.4437 24.425 63.4437 23.525C63.4437 22.615 63.5937 21.845 63.8937 21.215C64.2037 20.585 64.6287 20.105 65.1687 19.775C65.7187 19.435 66.3587 19.265 67.0887 19.265ZM67.0887 20.495C66.5187 20.495 66.0587 20.68 65.7087 21.05C65.3687 21.42 65.1687 21.945 65.1087 22.625H68.9187C68.9187 22.205 68.8537 21.835 68.7237 21.515C68.5937 21.195 68.3937 20.945 68.1237 20.765C67.8537 20.585 67.5087 20.495 67.0887 20.495ZM73.7147 27.5L70.6547 19.415H72.3347L74.0147 24.14C74.0847 24.34 74.1547 24.565 74.2247 24.815C74.3047 25.065 74.3747 25.305 74.4347 25.535C74.4947 25.765 74.5347 25.965 74.5547 26.135H74.6147C74.6447 25.965 74.6897 25.765 74.7497 25.535C74.8197 25.295 74.8947 25.055 74.9747 24.815C75.0547 24.565 75.1247 24.34 75.1847 24.14L76.8647 19.415H78.5447L75.4697 27.5H73.7147Z'
						fill='#B82929'
					/>
				</svg>
			</button>
			{renderPageNumbers()}
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === pageCount}
				className='pagination-button'>
				<svg width='105' height='44' viewBox='0 0 105 44' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<rect x='1' y='1' width='103' height='42' rx='21' stroke='#B82929' strokeWidth='2' />
					<path
						d='M34.215 27.5H32.25L26.835 18.845H26.775C26.785 19.045 26.795 19.26 26.805 19.49C26.825 19.72 26.84 19.965 26.85 20.225C26.86 20.475 26.87 20.735 26.88 21.005C26.89 21.265 26.895 21.53 26.895 21.8V27.5H25.425V16.79H27.375L32.775 25.4H32.82C32.81 25.25 32.8 25.065 32.79 24.845C32.78 24.615 32.77 24.37 32.76 24.11C32.76 23.85 32.755 23.585 32.745 23.315C32.735 23.045 32.725 22.79 32.715 22.55V16.79H34.215V27.5ZM39.7705 19.265C40.4805 19.265 41.0905 19.415 41.6005 19.715C42.1105 20.005 42.5005 20.425 42.7705 20.975C43.0505 21.525 43.1905 22.175 43.1905 22.925V23.795H37.7605C37.7805 24.625 37.9955 25.26 38.4055 25.7C38.8255 26.14 39.4105 26.36 40.1605 26.36C40.6805 26.36 41.1405 26.315 41.5405 26.225C41.9505 26.125 42.3705 25.98 42.8005 25.79V27.11C42.4005 27.29 41.9905 27.425 41.5705 27.515C41.1605 27.605 40.6705 27.65 40.1005 27.65C39.3205 27.65 38.6305 27.495 38.0305 27.185C37.4305 26.875 36.9605 26.415 36.6205 25.805C36.2905 25.185 36.1255 24.425 36.1255 23.525C36.1255 22.615 36.2755 21.845 36.5755 21.215C36.8855 20.585 37.3105 20.105 37.8505 19.775C38.4005 19.435 39.0405 19.265 39.7705 19.265ZM39.7705 20.495C39.2005 20.495 38.7405 20.68 38.3905 21.05C38.0505 21.42 37.8505 21.945 37.7905 22.625H41.6005C41.6005 22.205 41.5355 21.835 41.4055 21.515C41.2755 21.195 41.0755 20.945 40.8055 20.765C40.5355 20.585 40.1905 20.495 39.7705 20.495ZM46.4265 23.375L43.6815 19.415H45.4965L47.4165 22.325L49.3365 19.415H51.1365L48.3915 23.375L51.2715 27.5H49.4715L47.4165 24.41L45.3465 27.5H43.5465L46.4265 23.375ZM55.3361 26.36C55.5461 26.36 55.7611 26.34 55.9811 26.3C56.2011 26.26 56.3911 26.215 56.5511 26.165V27.365C56.3811 27.445 56.1511 27.51 55.8611 27.56C55.5711 27.62 55.2811 27.65 54.9911 27.65C54.5511 27.65 54.1461 27.575 53.7761 27.425C53.4161 27.275 53.1261 27.015 52.9061 26.645C52.6861 26.275 52.5761 25.76 52.5761 25.1V20.63H51.4511V19.91L52.6361 19.31L53.1911 17.6H54.1661V19.415H56.4761V20.63H54.1661V25.07C54.1661 25.51 54.2711 25.835 54.4811 26.045C54.7011 26.255 54.9861 26.36 55.3361 26.36Z'
						fill='#B82929'
					/>
					<path
						d='M68.5 27L73.5 22L68.5 17'
						stroke='#B82929'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
		</div>
	);
};

export default CustomPagination;
