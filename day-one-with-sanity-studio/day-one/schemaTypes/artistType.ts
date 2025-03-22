import { BiDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";
import { defineField, defineType } from "sanity";

export const artistType = defineType({
    name: 'artist',
    title: 'Artist',
    type: 'document',
    groups: [
        { name: 'detail', title: 'Detail', icon: BiDetail},
        { name: 'media', title: 'Media', icon: MdPermMedia}
    ],
    icon: FaUser,
    fields: [
        defineField({
            name: 'name',
            title: 'Artist Name',
            type: 'string',
            group: 'detail',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name'
            },
            validation: rule => rule
                .required()
                .error(`Requried to generate a page on the website`),
            hidden: ({document}) => !document?.name,
            group: 'detail',
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
            },
            group: 'detail',
        }),
         defineField({
            name: 'image',
            title: 'Artist Photo',
            type: 'image',
            options: {
                hotspot: true
            },
            group: 'media',
        }),
        defineField({
            name: 'bio',
            title: `Artist's Bio`,
            type: 'array',
            of: [{type: 'block'}],
            validation: rule => rule
                .required()
                .warning(`It's reccomend to add bio for the artist`)
        }),
        defineField({
            name: 'album',
            title: 'Popular Albums',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'album' }] }],
            hidden: ({document}) => !document?.name
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