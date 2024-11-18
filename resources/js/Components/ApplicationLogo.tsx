import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="/build/iii/logo.svg"
            alt="Application Logo"
        />
    );
}
