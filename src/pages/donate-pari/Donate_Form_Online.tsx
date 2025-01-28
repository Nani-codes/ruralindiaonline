import './Donate-Pari.module.css';

import DOMPurify from 'isomorphic-dompurify';

import { Button, Card, Checkbox, Chip, Group, NumberInput, Popover, Text, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';

import AddressIcon from '@/common/Icons/Addessicon';
import { Donate_Online_Type } from '@/types/donate_online';
import Mail_02 from '@/common/Icons/Mail_02';
import PhoneIconRed from '@/common/Icons/phonered';
import UserSquare from '@/common/Icons/User_Square';
import { createForm } from '@/lib/Donate_Online_Api';
import { useForm } from '@mantine/form';
import { useViewportSize } from '@mantine/hooks';

export default function Donate_Form_Online({ content }: { content: string }) {
	const { width } = useViewportSize();
	const form = useForm<Donate_Online_Type>({
		initialValues: {
			Monthly: false,
			Yearly: false,
			Onetime: false,
			full_name: '',
			email_address: '',
			phone_number: '',
			pan_number: '',
			address: '',
			citizen_of_india: false,
			amount: 1,
		},

		validate: {
			full_name: (value) => (value?.trim().length === 0 ? 'Name is required' : false),
			email_address: (value) => (value?.trim().length === 0 ? 'Email is required' : false),
			phone_number: (value) => (value?.trim().length === 0 ? 'Phone Number is required' : false),
			pan_number: (value) => (value?.trim().length === 0 ? 'Pan Number is required' : false),
			address: (value) => (value?.trim().length === 0 ? 'Address is required' : false),
			amount: (value) => (value === 0 || value < 1 ? 'Amount is required' : false),
		},
	});
	const [opened, setOpened] = useState(false);

	return (
		<Card bg={'#FFFFFF'} p={0} radius={'1rem'}>
			<form
				onSubmit={form.onSubmit((values) => {
					const dataset: Donate_Online_Type = {
						Monthly: values.Monthly,
						Yearly: values.Yearly,
						Onetime: values.Onetime,
						full_name: values?.full_name?.trim(),
						email_address: values?.email_address?.trim(),
						phone_number: values?.phone_number?.trim(),
						pan_number: values?.pan_number?.trim(),
						address: values?.address?.trim(),
						citizen_of_india: values?.citizen_of_india,
						amount: values?.amount,
					};
					// console.log('dataset', dataset);

					createForm({
						...dataset,
					})
						.then((resp) => {
							// console.log(resp);
						})
						.catch((err) => {
							// console.log(err);
						})
						.finally(() => {
							form.reset();
						});
				})}>
				<Group justify='flex-start' gap={width >= 1024 ? '24px' : '10px'}>
					<Checkbox
						py={'12px'}
						// pl={'12px'}
						pr={'8px'}
						size={width >= 378 ? '24px' : '20px'}
						styles={{
							label: {
								fontSize: '12px',
								fontWeight: 500,
								color: '#828282',
								padding: '0px',
								lineHeight: '25.5px',
								letterSpacing: '-0.45px',
								fontFamily: 'Noto Sans',
							},
							body: { gap: '8px' },
						}}
						label='Monthly'
						{...form.getInputProps('Monthly', { type: 'checkbox' })}
					/>
					<Checkbox
						py={'12px'}
						// pl={'12px'}
						pr={'8px'}
						size={width >= 378 ? '24px' : '20px'}
						styles={{
							label: {
								fontSize: '12px',
								fontWeight: 500,
								color: '#828282',
								padding: '0px',
								lineHeight: '25.5px',
								letterSpacing: '-0.45px',
								fontFamily: 'Noto Sans',
							},
							body: { gap: '8px' },
						}}
						label='Yearly'
						{...form.getInputProps('Yearly', { type: 'checkbox' })}
					/>
					<Checkbox
						py={'12px'}
						// pl={'12px'}
						pr={'8px'}
						size={width >= 378 ? '24px' : '20px'}
						styles={{
							label: {
								fontSize: '12px',
								fontWeight: 500,
								color: '#828282',
								padding: '0px',
								lineHeight: '25.5px',
								letterSpacing: '-0.45px',
								fontFamily: 'Noto Sans',
							},
							body: { gap: '8px' },
						}}
						label='Onetime'
						{...form.getInputProps('Onetime', { type: 'checkbox' })}
					/>
				</Group>
				<TextInput
					required
					mt={'21px'}
					radius='3rem '
					size='md'
					variant='transparent'
					color='#828282'
					leftSection={<UserSquare />}
					placeholder='Full Name*'
					style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
					styles={{
						input: {
							color: '#828282',
							fontSize: '12px',
							fontWeight: 500,
							fontFamily: 'Noto Sans',
							lineHeight: '22.4px',
							letterSpacing: '-0.02625rem',
						},
					}}
					{...form.getInputProps('full_name')}
				/>

				<TextInput
					mt={'12px'}
					radius='3rem '
					required
					size='md'
					variant='transparent'
					c={'#828282'}
					leftSection={<Mail_02 />}
					placeholder='Email Address*'
					style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
					styles={{
						input: {
							color: '#828282',
							fontSize: '12px',
							fontWeight: 500,
							fontFamily: 'Noto Sans',
							lineHeight: '22.4px',
							letterSpacing: '-0.02625rem',
						},
					}}
					{...form.getInputProps('email_address')}
				/>

				<TextInput
					mt={'12px'}
					radius='3rem '
					size='md'
					variant='transparent'
					c={'#828282'}
					leftSection={<PhoneIconRed />}
					placeholder='Phone Number'
					style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
					styles={{
						input: {
							color: '#828282',
							fontSize: '12px',
							fontWeight: 500,
							fontFamily: 'Noto Sans',
							lineHeight: '22.4px',
							letterSpacing: '-0.02625rem',
						},
					}}
					{...form.getInputProps('phone_number')}
				/>
				<TextInput
					mt={'12px'}
					radius='3rem '
					size='md'
					variant='transparent'
					required
					c={'#828282'}
					leftSection={<UserSquare />}
					placeholder='Pan Number*'
					style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
					styles={{
						input: {
							color: '#828282',
							fontSize: '12px',
							fontWeight: 500,
							fontFamily: 'Noto Sans',
							lineHeight: '22.4px',
							letterSpacing: '-0.02625rem',
						},
					}}
					{...form.getInputProps('pan_number')}
				/>
				<Text
					py={'12px'}
					c={'#828282'}
					style={{
						fontSize: '13px',
						fontWeight: 400,
						fontFamily: 'Noto Sans',
						fontStyle: 'italic',
						lineHeight: '1.38125rem',
						letterSpacing: '-0.01625rem',
					}}>
					Required as per government regulations
				</Text>
				<TextInput
					required
					radius='3rem '
					size='md'
					variant='transparent'
					c={'#828282'}
					leftSection={<AddressIcon />}
					placeholder='Address*'
					style={{ border: '1px solid #E0E0E0', borderRadius: '20px' }}
					styles={{
						input: {
							color: '#828282',
							fontSize: '12px',
							fontWeight: 500,
							fontFamily: 'Noto Sans',
							lineHeight: '22.4px',
							letterSpacing: '-0.02625rem',
						},
					}}
					{...form.getInputProps('address')}
				/>
				<Text
					py={'12px'}
					c={'#828282'}
					style={{
						fontSize: '13px',
						fontWeight: 400,
						fontFamily: 'Noto Sans',
						fontStyle: 'italic',
						lineHeight: '1.38125rem',
						letterSpacing: '-0.01625rem',
					}}>
					Required as per government regulations
				</Text>
				<Checkbox
					py={'21px'}
					pr={'8px'}
					size='24px'
					styles={{
						label: {
							fontSize: '12px',
							fontWeight: 500,
							color: '#828282',
							padding: '0px',
							lineHeight: '1.2rem',
							letterSpacing: '-0.0225rem',
							fontFamily: 'Noto Sans',
						},
						body: { gap: '8px' },
					}}
					label='I’m a citizen of India'
					{...form.getInputProps('citizen_of_india', { type: 'checkbox' })}
				/>
				<Chip.Group {...form.getInputProps('amount')} multiple={false}>
					<Group justify='flex-start' gap={8}>
						<Chip
							size='xs'
							color='red'
							value='500'
							styles={{
								label: {
									color: '#B82929',
									fontSize: '12px',
									fontWeight: 500,
									lineHeight: '19.2px',
									letterSpacing: '-0.36px',
									fontFamily: 'Noto Sans',
									border: '1px solid #B82929',
									borderRadius: '15px',
								},
							}}
							checked={+form.values['amount'] === 500}
							variant='outline-hover-filled'>
							Rs.500
						</Chip>
						<Chip
							size='xs'
							color='red'
							styles={{
								label: {
									color: '#B82929',
									fontSize: '12px',
									fontWeight: 500,
									lineHeight: '19.2px',
									letterSpacing: '-0.36px',
									fontFamily: 'Noto Sans',
									border: '1px solid #B82929',
									borderRadius: '15px',
								},
							}}
							checked={+form.values['amount'] === 1000}
							value='1000'
							variant='outline-hover-filled'>
							Rs.1000
						</Chip>
						<Chip
							size='xs'
							color='red'
							styles={{
								label: {
									color: '#B82929',
									fontSize: '12px',
									fontWeight: 500,
									lineHeight: '19.2px',
									letterSpacing: '-0.36px',
									fontFamily: 'Noto Sans',
									border: '1px solid #B82929',
									borderRadius: '15px',
								},
							}}
							checked={+form.values['amount'] === 2000}
							value='2000'
							variant='outline-hover-filled'>
							Rs.2000
						</Chip>
						<Popover position='top' withArrow shadow='md'>
							<Popover.Target>
								<Chip
									size='xs'
									color='red'
									styles={{
										label: {
											color: '#B82929',
											fontSize: '12px',
											fontWeight: 500,
											lineHeight: '19.2px',
											letterSpacing: '-0.36px',
											fontFamily: 'Noto Sans',
											border: '1px solid #B82929',
											borderRadius: '15px',
										},
									}}
									value={1}
									checked={
										+form.values['amount'] !== 500 &&
										+form.values['amount'] !== 1000 &&
										+form.values['amount'] !== 2000
									}
									variant='outline-hover-filled'>
									Other
								</Chip>
							</Popover.Target>
							<Popover.Dropdown bg='var(--mantine-color-body)' p={0}>
								<Card>
									<NumberInput
										placeholder='Enter Amount'
										allowNegative={false}
										allowDecimal={false}
										min={1}
										{...form.getInputProps('amount')}
									/>
								</Card>
							</Popover.Dropdown>
						</Popover>
						<Text
							c={'#B82929'}
							style={{
								fontSize: '13px',
								fontWeight: 400,
								fontFamily: 'Noto Sans',
								fontStyle: 'italic',
								lineHeight: '1.38125rem',
								letterSpacing: '-0.01625rem',
							}}>
							{form.values['amount']}
						</Text>
					</Group>
				</Chip.Group>

				<Text
					c={'#828282'}
					pt={'21px'}
					style={{
						fontSize: '13px',
						fontWeight: 400,
						fontFamily: 'Noto Sans',
						fontStyle: 'italic',
						lineHeight: '1.38125rem',
						letterSpacing: '-0.01625rem',
					}}>
					<div
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(content),
						}}></div>
				</Text>

				<Button
					mt='24px'
					type='submit'
					variant='outline-hover-filled'
					radius='3rem'
					size='md'
					color='#B82929'
					style={{
						border: '2px solid',
						fontSize: '15px',
						fontWeight: 500,
						fontFamily: 'Noto Sans',
						lineHeight: '1.6875rem',
						letterSpacing: '-0.01875rem',
					}}
					styles={{
						label: { paddingTop: '12px', paddingBottom: '12px', paddingLeft: '24px', paddingRight: '24px' },
						root: { padding: '0' },
					}}>
					Confirm & Donate
				</Button>
			</form>
		</Card>
	);
}
