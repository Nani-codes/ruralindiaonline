'use Client';

import BaseText from '../Base/BaseText';
import { Paper } from '@mantine/core';

const ArticleText = ({ text }: ArticleTextProps) => {
	return (
		<Paper p={0} m='auto' bg='#F4F4F4' w={{ base: '20rem', sm: '40rem' }}>
			<BaseText text={text?.replaceAll('&nbsp;', ' ')} />
		</Paper>
	);
};

export default ArticleText;
