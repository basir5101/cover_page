import Image from 'next/image';
import { useState } from 'react';

const ImageContainer = ({ src, alt, height, width }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <div className="image-container">
            {!imageLoaded && <div className="blur-placeholder"></div>}
            <Image
                src={src}
                height={height}
                width={width}
                alt={alt}
                style={{ height: '100%', width: '100%' }}
                className={imageLoaded ? 'loaded' : ''}
                onLoad={() => setImageLoaded(true)}
            // placeholder='blur'
            // layout="fill"
            // objectFit="cover"
            />
        </div>
    );
};

export default ImageContainer;
