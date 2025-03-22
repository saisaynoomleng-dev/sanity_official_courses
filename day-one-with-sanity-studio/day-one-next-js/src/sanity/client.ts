import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: '4u1tajy3',
    dataset: 'production',
    apiVersion: '2024-11-01',
    useCdn: false
})