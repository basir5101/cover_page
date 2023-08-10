import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultSeo } from "./default";

export default function SEO(props) {
    const router = useRouter();

    const title = props.title || 'generate cover page'
    let summary = props.summary || DefaultSeo.summary;
    const description = props.description || DefaultSeo.description;


    const abstract = props.summary || DefaultSeo.abstract;
    const canonicalUrl = `${process.env.NEXTAUTH_URL}${router.asPath}`;


    const keywords = props.keywords || DefaultSeo.keywords;
    const imageUrl = props.imageUrl || `${process.env.NEXTAUTH_URL}/logo.png`;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="abstract" content={abstract} />

            <link rel="canonical" href={canonicalUrl} />
            <link rel="shortlink" href={canonicalUrl} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={summary} />
            <meta property="og:site_name" content={DefaultSeo.siteName} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />


            <link rel="icon" href="/favicon.ico" />
            <meta name="MobileOptimized" content="width" />
            <meta name="HandheldFriendly" content="true" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="news_keywords" content={keywords} />
            <meta name="rights" content="coverpagemaker" />
            <link rel="image_src" href={imageUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:url" content={imageUrl} />
            <meta property="og:image:secure_url" content={imageUrl} />
        </Head>
    );
}

