import { Card, Flex, SimpleGrid, Tabs, Text } from '@mantine/core';
import Donate_Form_Online from '../../pages/donate-pari/Donate_Form_Online';
import Donate_Form_Cheque from '../../pages/donate-pari/Donate_Form_Cheque';
import Donate_Form_Bank from '../../pages/donate-pari/Donate_Form_Bank';
import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import axios from 'axios';

export default function DonateComponent({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [activeTab, setActiveTab] = useState<string | null>('Online');
	return (
		<SimpleGrid cols={{ base: 1, xl: 2, sm: 1, md: 2, lg: 2 }} spacing={'100px'} p={0} m='auto'>
			<Flex gap='md' justify='flex-start' align='flex-start' direction='column' wrap='wrap'>
				<Text
					style={{
						fontSize: '32px',
						fontWeight: 700,
						fontFamily: ' Noto Sans',
						lineHeight: '2.48rem',
						letterSpacing: '-0.08rem',
					}}>
					Donate to PARI
				</Text>
				<Text
					c={'#828282'}
					style={{
						fontSize: '13px',
						fontWeight: 400,
						fontFamily: ' Noto Sans',
						fontStyle: 'italic',
						lineHeight: '1.38125rem',
						letterSpacing: '-0.01625rem',
					}}>
					All donors will be entitled to tax exemptions under Section-80G of the Income Tax Act. Please double check your
					email address before submitting.
				</Text>
			</Flex>
			<Card p={0}>
				<Tabs
					mb={'24px'}
					color={'#B82929'}
					variant='pills'
					radius='1.5rem'
					value={activeTab}
					onChange={setActiveTab}
					defaultValue='Schools'
					style={{ background: 'white', borderRadius: '24px', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)' }}
					styles={{
						tab: { paddingTop: '4px', paddingBottom: '4px', paddingRight: '12px', paddingLeft: '12px' },
						list: {
							gap: '8px',
						},
					}}
					m={0}
					p={'8px'}>
					<Tabs.List>
						<Tabs.Tab
							value='Online'
							style={{
								fontSize: '12px',
								fontWeight: '500',
								borderRadius: '3rem',
								letterSpacing: '-0.0225rem',
								lineHeight: '1.2rem',
								fontFamily: 'Noto Sans',
							}}
							styles={{ tabLabel: { color: activeTab === 'Online' ? '#FFFFFF' : '#828282' } }}>
							Online
						</Tabs.Tab>
						<Tabs.Tab
							value='Cheque/DD'
							style={{
								fontSize: '12px',
								fontWeight: '500',
								borderRadius: '3rem',
								letterSpacing: '-0.0225rem',
								lineHeight: '1.2rem',
								fontFamily: 'Noto Sans',
							}}
							styles={{ tabLabel: { color: activeTab === 'Cheque/DD' ? '#FFFFFF' : '#828282' } }}>
							Cheque/DD
						</Tabs.Tab>
						<Tabs.Tab
							value='Bank_Transfer'
							style={{
								fontSize: '12px',
								fontWeight: '500',
								borderRadius: '3rem',
								letterSpacing: '-0.0225rem',
								lineHeight: '1.2rem',
								fontFamily: 'Noto Sans',
							}}
							styles={{ tabLabel: { color: activeTab === 'Bank_Transfer' ? '#FFFFFF' : '#828282' } }}>
							Bank Transfer
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>
				{activeTab === 'Online' ? <Donate_Form_Online content={data?.DonateToPari_Model_content} /> : null}
				{activeTab === 'Cheque/DD' ? <Donate_Form_Cheque content={data?.DonateToPari_Model_content} /> : null}
				{activeTab === 'Bank_Transfer' ? <Donate_Form_Bank content={data?.DonateToPari_Model_content} /> : null}
			</Card>
		</SimpleGrid>
	);
}

export const getServerSideProps = (async ({ locale }) => {
	const DonateResp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/donate-to-pari?populate[Donate_FAQ_Card][populate]=*`);

	return {
		props: {
			data: DonateResp?.data.data.attributes,
			messages: require(`@/locales/${locale}.json`),
		},
	};
}) satisfies GetServerSideProps<{ data: any }>;
