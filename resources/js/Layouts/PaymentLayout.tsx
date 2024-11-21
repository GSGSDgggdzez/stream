import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = '/build/iii/hero1.svg'; // Preload the image

        img.onload = () => {
            setIsLoaded(true); // Set loaded state to true when the image is loaded
        };
    }, []);

    return (
        <div
            className={`flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-[#1F1F1F] transition-all duration-500 ease-in-out ${
                isLoaded ? 'bg-[url("/build/ii/hero1.svg")] bg-cover bg-center' : 'bg-transparent blur-sm'
            }`}
        >
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 fill-current" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-[#0f0f0fea] px-6 py-4 shadow-md sm:max-w-6xl sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}

