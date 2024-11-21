import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#1F1F1F] pt-6 sm:justify-center sm:pt-0 bg-[url('/build/ii/hero1.svg')] bg-cover bg-center">
          
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 fill-current" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-[#0f0f0fea] px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}