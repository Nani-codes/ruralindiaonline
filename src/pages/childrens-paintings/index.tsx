export default function ChildrenPaintingsDummy() {
	return <></>;
}

export async function getServerSideProps(context: any) {
	return {
		redirect: {
			permanent: true,
			destination: '/childrens-paintings/1',
		},
	};
}
