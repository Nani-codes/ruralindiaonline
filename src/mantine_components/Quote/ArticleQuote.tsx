import { Paper, useMantineTheme } from '@mantine/core';

import BaseQuote from '../Base/BaseQuote';

const ArticleQuote = ({ quote }: ArticleQuoteProps) => {
	return (
		<Paper m='auto' bg='#F4F4F4' w={{ base: '20rem', sm: '40rem' }}>
			<BaseQuote quote={quote} />
		</Paper>
	);
};

export default ArticleQuote;
