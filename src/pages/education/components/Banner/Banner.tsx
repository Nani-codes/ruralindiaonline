import { ActionIcon, Box, Button, Card, Group, Stack, Text, Title, Grid } from '@mantine/core';
import { useContext, useRef } from 'react';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
import BannerCard from './BannerCard';
import { Carousel } from '@mantine/carousel';
import EducationContext from '@/lib/EducationContext';
import EducationIcon from '@/common/Icons/EducationIcon';
import { FaAngleRight } from 'react-icons/fa6';
import { MdOutlineSchool } from 'react-icons/md';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

type EducationCards = {
    serial_no: number;
    Title: string;
    Description: string;
    URL: string;
    ButtonText: string;
    Card_Color: string;
};

const BannerSection = ({ open, title, cards }: { open: () => void; title: string; cards: EducationCards[] }) => {
    const educationValues = useContext(EducationContext);
    const { width } = useViewportSize();
    const isMobile = useMediaQuery('(max-width: 1023px)');
    const wheelGestures = useRef(WheelGesturesPlugin({}));

    return (
        <Box py={width >= 1024 ? '5rem' : '2.81rem'}>
            <Group justify='center' m='auto' w={{ base: '80%', sm: '90%' }}>
                <ActionIcon variant='filled' style={{ width: '50px', height: '50px', padding: '12.5px' }} radius='xl' bg={'#2F80ED'}>
                    <EducationIcon />
                </ActionIcon>
                <Title
                    size={width >= 1024 ? '28px' : '20px'}
                    fw={700}
                    c={'#333'}
                    order={3}
                    style={{
                        letterSpacing: width >= 1024 ? '-0.071rem' : '-0.048rem',
                        fontFamily: 'Noto Sans',
                        lineHeight: width >= 1024 ? '2.2rem' : '1.5rem',
                    }}>
                    PARI Education
                </Title>
            </Group>

            <Group justify='center' pt={width >= 1024 ? '1.13rem' : '0.56rem'} mx='auto'>
                <Title
                    c='#2F80ED'
                    size={width >= 1023 ? '56px' : width >= 413 ? '28px' : '24px'}
                    pt='md'
                    fw={700}
                    style={{
                        letterSpacing: width >= 1024 ? '-0.14rem' : '-0.06781rem',
                        lineHeight: width >= 1024 ? '4.27rem' : '2.10263rem',
                        fontFamily: 'Noto Sans',
                    }}>
                    {title}
                </Title>
            </Group>
            <Group
                justify='center'
                pt={width >= 1024 ? '5rem' : '2.81rem'}
                px={{
                    base: educationValues.padding,
                    md: +educationValues.padding.split('px')[0] + 27 + 'px',
                    lg: +educationValues.padding.split('px')[0] + 27 + 'px',
                    xl: +educationValues.padding.split('px')[0] + 27 + 'px',
                    xl2: +educationValues.padding.split('px')[0] + 27 + 'px',
                }}
                w={{ base: '100%' }}>
                {isMobile ? (
                    <Carousel
                        styles={{ root: { width: '100%' } }}
                        slideSize={{
                            xs: '80vw',
                            sm: '80vw',
                            sm2: '66.3vw',
                            sm3: '49.7vw',
                            md: '35vw',
                            lg: '27vw',
                            xl: '27vw',
                            xl2: '22vw',
                            xl3: '23vw',
                        }}
                        slideGap='16px' // Set the gap between slides
                        align='start'
                        plugins={[wheelGestures.current]}
                        withControls={false}
                        draggable={false}>
                        {cards
                            ?.sort((a, b) => a.serial_no - b.serial_no)
                            .map((card, i) => (
                                <Carousel.Slide key={card.serial_no + `${i}`}>
                                    <Card
                                        shadow='sm'
                                        padding='xl'
                                        radius={'1rem'}
                                        withBorder
                                        bg={card.Card_Color}
                                        h={372}
                                        w={366}
                                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <Stack align='flex-start' h='100%' justify='space-between'>
                                            <Title
                                                c='white'
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: '700',
                                                    letterSpacing: '-0.05rem',
                                                    lineHeight: '1.2rem',
                                                    fontFamily: 'Noto Sans',
                                                }}>
                                                {card.Title}
                                            </Title>
                                            <Text
                                                size='sm'
                                                c='white'
                                                lineClamp={6}
                                                style={{
                                                    fontSize: '14px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.02813rem',
                                                    lineHeight: '1.59375rem',
                                                    fontFamily: 'Noto Sans',
                                                }}>
                                                {card.Description}
                                            </Text>
                                            <Button
                                                variant="outline"
                                                radius="3rem"
                                                onClick={() => window.open(card.URL, '_blank')}
                                                c="white"
                                                rightSection={<FaAngleRight size={14} />}
                                                styles={{
                                                    root: {
                                                        paddingTop: '8px',
                                                        paddingBottom: '8px',
                                                        paddingRight: '16px',
                                                        paddingLeft: '16px',
                                                        borderColor: 'white',
                                                        fontSize: '12px',
                                                        fontWeight: 500,
                                                        letterSpacing: '-0.0225rem',
                                                        lineHeight: '1.2rem',
                                                        fontFamily: 'Noto Sans',
                                                        color: 'white',
                                                    },
                                                    label: {
                                                        color: 'white',
                                                    },
                                                }}
                                                style={{
                                                    border: '2px solid white',
                                                }}
                                            >
                                                {card.ButtonText}
                                            </Button>
                                        </Stack>
                                    </Card>
                                </Carousel.Slide>
                            ))}
                        <Carousel.Slide>
                            <Card
                                shadow='sm'
                                padding='xl'
                                radius={'1rem'}
                                withBorder
                                bg={'#333333'}
                                h={372}
                                w={366}
                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Stack align='flex-start' h='100%' justify='space-between'>
                                    <Title
                                        c='white'
                                        style={{
                                            fontSize: '32px',
                                            fontWeight: '700',
                                            letterSpacing: '-0.08rem',
                                            lineHeight: '2.48rem',
                                            fontFamily: 'Noto Sans',
                                        }}>
                                        Join us
                                    </Title>
                                    <Text
                                        size='sm'
                                        c='#E0E0E0'
                                        lineClamp={6}
                                        style={{
                                            fontSize: '15px',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            letterSpacing: '-0.02813rem',
                                            lineHeight: '1.59375rem',
                                            fontFamily: 'Noto Sans',
                                        }}>
                                        The PARI Library brings reports and information on rural India to a single location for students,
                                        researchers and other readers. It includes official as well as independent reports, out-of-print
                                        books, rare documents and reviewed research articles.
                                    </Text>
                                    <Button
                                        variant="outline"
                                        radius="3rem"
                                        onClick={open}
                                        c="white"
                                        rightSection={<FaAngleRight size={14} />}
                                        styles={{
                                            root: {
                                                paddingTop: '8px',
                                                paddingBottom: '8px',
                                                paddingRight: '16px',
                                                paddingLeft: '16px',
                                                borderColor: 'white',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                letterSpacing: '-0.0225rem',
                                                lineHeight: '1.2rem',
                                                fontFamily: 'Noto Sans',
                                                color: 'white',
                                            },
                                            label: {
                                                color: 'white',
                                            },
                                        }}
                                        style={{
                                            border: '2px solid white',
                                        }}
                                    >
                                        Come Join Us
                                    </Button>
                                </Stack>
                            </Card>
                        </Carousel.Slide>
                    </Carousel>
                ) : (
                    <Grid gutter='40px'> {/* Set the gap between grid columns */}
                        {cards
                            ?.sort((a, b) => a.serial_no - b.serial_no)
                            .map((card, i) => (
                                <Grid.Col key={card.serial_no + `${i}`} span={4}>
                                    <Card
                                        shadow='sm'
                                        padding='xl'
                                        radius={'1rem'}
                                        withBorder
                                        bg={card.Card_Color}
                                        h={372}
                                        w={280}
                                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <Stack align='flex-start' h='100%' justify='space-between'>
                                            <Title
                                                c='white'
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: '700',
                                                    letterSpacing: '-0.05rem',
                                                    lineHeight: '1.2rem',
                                                    fontFamily: 'Noto Sans',
                                                }}>
                                                {card.Title}
                                            </Title>
                                            <Text
                                                size='sm'
                                                c='white'
                                                lineClamp={6}
                                                style={{
                                                    fontSize: '14px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.02813rem',
                                                    lineHeight: '1.59375rem',
                                                    fontFamily: 'Noto Sans',
                                                }}>
                                                {card.Description}
                                            </Text>
                                            <Button
                                                variant="outline"
                                                radius="3rem"
                                                onClick={() => window.open(card.URL, '_blank')}
                                                c="white"
                                                rightSection={<FaAngleRight size={14} />}
                                                styles={{
                                                    root: {
                                                        paddingTop: '8px',
                                                        paddingBottom: '8px',
                                                        paddingRight: '16px',
                                                        paddingLeft: '16px',
                                                        borderColor: 'white',
                                                        fontSize: '12px',
                                                        fontWeight: 500,
                                                        letterSpacing: '-0.0225rem',
                                                        lineHeight: '1.2rem',
                                                        fontFamily: 'Noto Sans',
                                                        color: 'white',
                                                    },
                                                    label: {
                                                        color: 'white',
                                                    },
                                                }}
                                                style={{
                                                    border: '2px solid white',
                                                }}
                                            >
                                                {card.ButtonText}
                                            </Button>
                                        </Stack>
                                    </Card>
                                </Grid.Col>
                            ))}
                        <Grid.Col span={4}>
                            <Card
                                shadow='sm'
                                padding='xl'
                                radius={'1rem'}
                                withBorder
                                bg={'#333333'}
                                h={372}
                                w={280}
                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Stack align='flex-start' h='100%' justify='space-between'>
                                    <Title
                                        c='white'
                                        style={{
                                            fontSize: '32px',
                                            fontWeight: '700',
                                            letterSpacing: '-0.08rem',
                                            lineHeight: '2.48rem',
                                            fontFamily: 'Noto Sans',
                                        }}>
                                        Join us
                                    </Title>
                                    <Text
                                        size='sm'
                                        c='#E0E0E0'
                                        lineClamp={6}
                                        style={{
                                            fontSize: '15px',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            letterSpacing: '-0.02813rem',
                                            lineHeight: '1.59375rem',
                                            fontFamily: 'Noto Sans',
                                        }}>
                                        The PARI Library brings reports and information on rural India to a single location for students,
                                        researchers and other readers. It includes official as well as independent reports, out-of-print
                                        books, rare documents and reviewed research articles.
                                    </Text>
                                    <Button
                                        variant="outline"
                                        radius="3rem"
                                        onClick={open}
                                        c="white"
                                        rightSection={<FaAngleRight size={14} />}
                                        styles={{
                                            root: {
                                                paddingTop: '8px',
                                                paddingBottom: '8px',
                                                paddingRight: '16px',
                                                paddingLeft: '16px',
                                                borderColor: 'white',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                letterSpacing: '-0.0225rem',
                                                lineHeight: '1.2rem',
                                                fontFamily: 'Noto Sans',
                                                color: 'white',
                                            },
                                            label: {
                                                color: 'white',
                                            },
                                        }}
                                        style={{
                                            border: '2px solid white',
                                        }}
                                    >
                                        Come Join Us
                                    </Button>
                                </Stack>
                            </Card>
                        </Grid.Col>
                    </Grid>
                )}
            </Group>
        </Box>
    );
};

export default BannerSection;