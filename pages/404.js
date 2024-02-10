import Layout from '@/components/layout/CommonLayout'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <Layout>
            <section>
                <div className="container text-center mt-5">
                    <h1 className="display-4">404 - Page Not Found</h1>
                    <p className="lead">{`The page you're looking for doesn't exist.`}</p>
                    <Link className="btn btn-primary" href="/">
                        Go Back to Home Page
                    </Link>
                </div>
            </section>
        </Layout>
    )
}
