// components/BootstrapLoader.js
import dynamic from 'next/dynamic';

const BootstrapLoader = dynamic(
    () => {
        return import('bootstrap/dist/js/bootstrap.bundle.min.js');
    },
    { ssr: false } // This ensures the script is only loaded on the client side
);

export default BootstrapLoader;
