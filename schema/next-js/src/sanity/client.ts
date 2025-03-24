import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: 'o4i4s65y',
    dataset: 'production',
    apiVersion: '2024-11-01',
    useCdn: false
})