import { GetStaticPaths } from 'next/types';

export default function Child() {
	return <div></div>;
}

export const getServerSideProps = async (context: any) => {
	return {
		redirect: {
			destination: `/childrens-painting/${context?.params?.slug}/0`,
			permanent: true,
		},
	};
};
