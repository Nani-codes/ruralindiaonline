'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { BASE_URL } from '@/config';

export interface AnnouncementData {
    id: number;
    attributes: {
        Title: string;
        Description: {
            type: string;
            children: {
                text: string;
                type: string;
            }[];
        }[];
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        locale: string;
    };
}

export interface AnnouncementResponse {
    data: AnnouncementData;
    meta: any;
}

const Announcement = () => {
    const [announcement, setAnnouncement] = useState<AnnouncementData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await fetch(`${BASE_URL}api/announcement?locale=${router.locale}`);
                if (!response.ok) {
                    console.error('Fetch Error:', response.status, response.statusText);
                    throw new Error('Network response was not ok');
                }
                const data: AnnouncementResponse = await response.json();
                setAnnouncement(data.data);
            } catch (error) {
                console.error('Error fetching announcement:', error);
                setError(error instanceof Error ? error : new Error('An unknown error occurred'));
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncement();
    }, [router.locale]);

    const handleOpenDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal(); // Open the dialog
            setIsDialogOpen(true);
            document.body.classList.add('blurred');
        }
    };

    const handleCloseDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close(); // Close the dialog
            setIsDialogOpen(false);
            document.body.classList.remove('blurred');
        }
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
        if (event.target === dialogRef.current) {
            handleCloseDialog(); // Close the dialog if the backdrop is clicked
        }
    };

    if (loading) {
        return <div className='flex items-center justify-center h-screen'>Loading...</div>;
    }

    if (error) {
        return <div className='flex items-center justify-center h-screen text-red-500'>Error: {error.message}</div>;
    }

    if (!announcement) {
        return <div className='flex items-center justify-center h-screen'>No announcement found. Please try again later.</div>;
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-4'>
            <button
                style={{
                    fontSize: '1.5rem',
                    color: '#b82929',
                    textAlign: 'center',
                    marginTop: '10px',
                    animation: 'blink 3s ease-in-out infinite', // Slower blink with easing
                    padding: '12px 20px',
                    border: '2px solid #b82929',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.3s, transform 0.2s',
                }}
                className='hover:bg-[#b82929] hover:text-white hover:scale-105 text-lg md:text-xl lg:text-2xl'
                onClick={handleOpenDialog}>
                {announcement.attributes.Title}
            </button>

            <dialog
                ref={dialogRef}
                style={{ width: '50rem' }}
                className='p-6 rounded-lg shadow-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white relative'
                onClick={handleBackdropClick}>
                <button
                    onClick={handleCloseDialog}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        color: '#b82929',
                        background: '#f8d7da',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}>
                    X
                </button>
                <div className='space-y-4 flex flex-col items-center justify-center'>
                    <h2 className='text-xl font-bold text-gray-800 text-center md:text-2xl lg:text-3xl'>
                        {announcement.attributes.Title}
                    </h2>
                    <div className='text-gray-600 text-base md:text-lg lg:text-xl text-center'>
                        {announcement.attributes.Description.map((paragraph, index) => (
                            <p key={index} className='mb-3'>
                                {paragraph.children.map((child, childIndex) => (
                                    <span key={childIndex}>{child.text}</span>
                                ))}
                            </p>
                        ))}
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Announcement;

// CSS for blinking effect and blur effect
const styles = `
@keyframes blink {
  0% { opacity: 1; }
  25% { opacity: 0.6; }
  50% { opacity: 0.3; }
  75% { opacity: 0.6; }
  100% { opacity: 1; }
}

.blurred {
  filter: blur(5px);
  transition: filter 0.3s ease;
}
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}