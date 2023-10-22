import SEO from '@/components/SEO/SEO'
import CampusLists from '@/components/home/CampusLists'
import Layout from '@/components/layout/CommonLayout'
import React from 'react'

export default function index() {
    return (
        <Layout>
            <SEO />
            <CampusLists />
        </Layout>
    )
}
