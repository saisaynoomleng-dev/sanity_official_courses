import { FaUser } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export const artistType = defineType({
    name: 'artist',
    title: 'Artist',
    type: 'document',
    icon: FaUser,
    fields: [
        defineField({
            name: 'name',
            title: 'Artist Name',
            type: 'string'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name'
            }
        }),
        defineField({
            name: 'genre',
            title: `Artist's Genre`,
            type: 'string',
            options: {
                list: [
                    {title: 'Techno', value: 'techno'},
                    {title: 'Hip Hop', value: 'hipHop'},
                    {title: 'Country', value: 'country'},
                    {title: 'Rock', value: 'rock'},
                    {title: 'Metal Rock', value: 'metalRock'},
                    {title: 'EDM', value: 'edm'}
                ],
                layout: 'radio'
            }
        }),
         defineField({
            name: 'image',
            title: 'Artist Photo',
            type: 'image',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'bio',
            title: `Artist's Bio`,
            type: 'array',
            of: [{type: 'block'}]
        }),
        defineField({
            name: 'album',
            title: 'Popular Albums',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'album' }] }]
        })
    ],
    preview: {
        select: {
            title: 'name',
            genre: 'genre',
            image: 'image',
        },
        prepare({title, genre, image}){
            const nameFormatted = title || 'Artist Name Not Specified';

            return{
                title: nameFormatted,
                subtitle: genre.toUpperCase(),
                media: image ?? FaUser
            }
        }
    }
})