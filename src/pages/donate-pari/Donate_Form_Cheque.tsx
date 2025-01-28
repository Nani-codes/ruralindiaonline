import DOMPurify from 'isomorphic-dompurify';

import { ActionIcon, Button, Card, Checkbox, Group, Modal, Stack, Text, TextInput } from '@mantine/core';
import { useDisclosure, useViewportSize } from '@mantine/hooks';

import AddressIcon from '@/common/Icons/Addessicon';
import DonateIcon from '@/common/Icons/DonateIcon';
import { Donate_Check_Type } from '@/types/donate_check';
import Mail_02 from '@/common/Icons/Mail_02';
import PhoneIconRed from '@/common/Icons/phonered';
import UserSquare from '@/common/Icons/User_Square';
import { createForm } from '@/lib/Donate_Online_Api';
import { createForm_Donate_Cheque } from '@/lib/Donate_Cheque_Api';
import { useForm } from '@mantine/form';

export default function Donate_Form_Cheque({ content }: { content: string }) {
	const [opened, { open, close }] = useDisclosure(false);
	const { width } = useViewportSize();
	const form = useForm<Donate_Check_Type>({
		initialValues: {
			full_name: '',
			email_address: '',
			phone_number: '',
			pan_number: '',
			address: '',
			citizen_of_india: false,
		},

		validate: {},
	});
	return (
		<Card bg={'#FFFFFF'} p={0} radius={'1rem'}>
			<form
				onSubmit={form.onSubmit((values) => {
					const dataset: Donate_Check_Type = {
						full_name: values.full_name.trim(),
						email_address: values.email_address.trim(),
						phone_number: values.phone_number.trim(),
						pan_number: values.pan_number.trim(),
						address: values.address.trim(),
						citizen_of_india: values.citizen_of_india,
					};
					// console.log('dataset', dataset);

					createForm_Donate_Cheque({
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
				<TextInput
					mt={'21px'}
					radius='3rem '
					size='md'
					variant='transparent'
					color='#828282'
					leftSection={<UserSquare />}
					placeholder='Full Name*'
					required
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
					size='md'
					variant='transparent'
					c={'#828282'}
					leftSection={<Mail_02 />}
					placeholder='Email Address*'
					required
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
					c={'#828282'}
					leftSection={<UserSquare />}
					placeholder='Pan Number*'
					required
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

				<TextInput
					mt={'12px'}
					radius='3rem '
					size='md'
					variant='transparent'
					c={'#828282'}
					leftSection={<AddressIcon />}
					placeholder='Address*'
					required
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

				<Text
					c={'#828282'}
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

				<Modal opened={opened} onClose={close} withCloseButton={false} style={{ padding: '0' }} size={'lg'}>
					<Card px={width >= 1024 ? '40px' : '16px'} py={width >= 1024 ? '48px' : '16px'}>
						<ActionIcon variant='filled' color='#B82929' size='5rem' radius='6rem' aria-label='Settings'>
							<DonateIcon />
						</ActionIcon>
						<Group justify='flex-start' gap={0} pt={'24px'}>
							<Text
								c={'#333333'}
								style={{
									fontSize: '24px',
									fontWeight: 600,
									fontFamily: 'Noto Sans',
									fontStyle: 'normal',
									lineHeight: '2.25rem',
									letterSpacing: '-0.075rem',
								}}>
								Reference
							</Text>
							<Text
								c={'#B82929'}
								style={{
									fontSize: '24px',
									fontWeight: 600,
									fontFamily: 'Noto Sans',
									fontStyle: 'normal',
									lineHeight: '2.25rem',
									letterSpacing: '-0.075rem',
								}}>
								#P42694
							</Text>
						</Group>
						<Text
							pt={'8px'}
							c={'#333333'}
							style={{
								fontSize: '15px',
								fontWeight: 500,
								fontFamily: 'Noto Sans',
								fontStyle: 'normal',
								lineHeight: '1.6875rem',
								letterSpacing: '-0.01875rem',
							}}>
							You have chosen to donate via Cheque/DD
						</Text>
						<Text
							py={'24px'}
							c={'#333333'}
							style={{
								fontSize: '32px',
								fontWeight: 700,
								fontFamily: 'Noto Sans',
								fontStyle: 'normal',
								lineHeight: '2.48rem',
								letterSpacing: '-0.08rem',
							}}>
							Thank you for choosing to donate to The People’s Archive of Rural India.
						</Text>
						<Text
							pb={'12px'}
							c={'#333333'}
							size={width >= 1024 ? '16px' : '15px'}
							style={{
								fontWeight: 400,
								fontFamily: 'Noto Sans',
								fontStyle: 'normal',
								lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
								letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
							}}>
							Make it out to “CounterMedia Trust” and send it to us by courier/post along with the above reference ID.
						</Text>
						<Text
							pb={'24px'}
							c={'#333333'}
							size={width >= 1024 ? '16px' : '15px'}
							style={{
								fontWeight: 400,
								fontFamily: 'Noto Sans',
								fontStyle: 'normal',
								lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
								letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
							}}>
							Send by courier/post to:
						</Text>
						<Text
							c={'#333333'}
							size={width >= 1024 ? '16px' : '15px'}
							style={{
								fontWeight: 400,
								fontFamily: 'Noto Sans',
								fontStyle: 'normal',
								lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
								letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
							}}>
							CounterMedia Trust
						</Text>
						<Text
							c={'#333333'}
							size={width >= 1024 ? '16px' : '15px'}
							style={{
								fontWeight: 400,
								fontFamily: 'Noto Sans',
								fontStyle: 'normal',
								lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
								letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
							}}>
							c/o P. Sainath, 27/43 Sagar Sangam,
						</Text>
						<Text
							c={'#333333'}
							size={width >= 1024 ? '16px' : '15px'}
							style={{
								fontWeight: 400,
								fontFamily: 'Noto Sans',
								fontStyle: 'normal',
								lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
								letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
							}}>
							Bandra Reclamation,
						</Text>
						<Text
							c={'#333333'}
							size={width >= 1024 ? '16px' : '15px'}
							style={{
								fontWeight: 400,
								fontFamily: 'Noto Sans',
								fontStyle: 'normal',
								lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
								letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
							}}>
							Mumbai 400050,
						</Text>
						<Text
							c={'#333333'}
							size={width >= 1024 ? '16px' : '15px'}
							style={{
								fontWeight: 400,
								fontFamily: 'Noto Sans',
								fontStyle: 'normal',
								lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
								letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
							}}>
							Maharashtra,
						</Text>
						<Text
							c={'#333333'}
							size={width >= 1024 ? '16px' : '15px'}
							style={{
								fontWeight: 400,
								fontFamily: 'Noto Sans',
								fontStyle: 'normal',
								lineHeight: width >= 1024 ? '1.7rem' : '1.59375rem',
								letterSpacing: width >= 1024 ? '-0.01rem' : '-0.028125rem',
							}}>
							India.
						</Text>
					</Card>
				</Modal>

				<Button
					onClick={open}
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
					Submit & View Details
				</Button>
			</form>
		</Card>
	);
}
