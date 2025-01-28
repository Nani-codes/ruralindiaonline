import { Button, Card, Stack, Text, Title } from '@mantine/core';
import { FaAngleRight } from 'react-icons/fa6';
import Link from 'next/link';

const BannerCard = ({
    title,
    text,
    buttonText,
    cardColor,
    url,
}: {
    title: string;
    text: string;
    buttonText: string;
    cardColor: string;
    url: string;
}) => {
    return (
        <Card
            shadow="sm"
            padding="xl"
            style={{ borderRadius: '16px' }}
            withBorder
            bg={cardColor}
            h={{ base: '23.25em', sm3: '23.25em', md: '23.25em', lg: '23.25em', xl: '23.25em', xl2: '23.25em' }}
        >
            <Stack align="flex-start" h="100%" justify="start">
                <Title
                    c="white"
                    style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        letterSpacing: '-0.08rem',
                        lineHeight: '2.48rem',
                        fontFamily: 'Noto Sans',
                    }}
                    h={{ xs: '3.5em', sm: '3em', sm2: '3em', sm3: '3em', md: '3em', lg: '2.5em', xl: '3em', xl2: '3em' }}
                >
                    {title}
                </Title>

                <Text
                    size="sm"
                    c="#E0E0E0"
                    lineClamp={6}
                    style={{
                        fontSize: '15px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        letterSpacing: '-0.02813rem',
                        lineHeight: '1.59375rem',
                        fontFamily: 'Noto Sans',
                    }}
                    h={{ xs: '9em', sm: '10em', sm2: '10em', sm3: '10em', md: '11em', lg: '10.5em', xl: '11em', xl2: '10em' }}
                >
                    {text}
                </Text>

                <Link href={url || ''}>
                    <Button
                        variant="outline"
                        radius="3rem"
                        c="white"
                        rightSection={<FaAngleRight size={14} />}
                        styles={{
                            root: {
                                paddingTop: '8px',
                                paddingBottom: '8px',
                                paddingRight: '16px',
                                paddingLeft: '16px',
                                borderColor: 'white', // Set border color to white
                                fontSize: '12px',
                                fontWeight: 500,
                                letterSpacing: '-0.0225rem',
                                lineHeight: '1.2rem',
                                fontFamily: 'Noto Sans',
                                color: 'white', // Set text color to white
                            },
                            label: {
                                color: 'white', // Ensure label text color is white
                            },
                            // rightSection: {
                            //     color: 'white', // Ensure right section icon color is white
                            // },
                        }}
                        style={{
                            border: '2px solid white', // Ensure border width and color
                        }}
                    >
                        {buttonText}
                    </Button>
                </Link>
            </Stack>
        </Card>
    );
};

export default BannerCard;