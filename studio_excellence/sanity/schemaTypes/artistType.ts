import { FaFileArchive, FaUser } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";
import { defineArrayMember, defineField, defineType } from "sanity";

export const artistType = defineType({
    name: 'artist',
    title: 'Artist',
    icon: FaUser,
    groups: [
        { name: 'details', title: 'Details', icon: FaFileArchive },
        { name: 'media', title: 'Media', icon: MdPermMedia}
    ],
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Artist Name',
            type: 'string',
            group: 'details'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
               source: 'name'
            },
            hidden: ({document}) => !document?.name,
            validation: rule => rule
                .required()
                .error(`Required to generate a page on the website`),
             group: 'details',
        }),
        defineField({
            name: 'genre',
            type: 'string',
            options: {
                list: [
                    { title: 'Techno', value: 'techno'},
                    { title: 'Country', value: 'country'},
                    { title: 'Pop', value: 'pop'},
                    { title: 'Rock', value: 'rock'},
                    { title: 'EDM', value: 'edm'},
                    { title: 'Hip Hop', value: 'hipHop'}
                ],
                layout: 'radio'
            },
             group: 'details',
        }),
        defineField({
            name: 'image',
            title: 'Artist Image',
            type: 'image',
            options: {
                hotspot: true
            },
            group: 'media'
        }),
        defineField({
            name: 'album',
            title: `Artist's Ablum`,
            type: 'array',
            of: [ 
                defineArrayMember({
                    type: 'reference',
                    to: [{type: 'album'}]
                })
            ],
            group: 'media'
        }),
        defineField({
            name: 'description',
            title: 'Artist Bio',
            description: 'Short description about Artist',
            type: 'array',
            of: [
                {type: 'block'}
            ],
            group: 'details'
        }),
        defineField({
            name: 'bio',
            title: 'Artist Bio',
            description: 'Artist Description',
            type: 'array',
            of: [
                {type: 'block'}
            ],
            deprecated: {
                reason: 'Name have been changed to description, Use description field instead'
            },
            readOnly: true,
            // hidden: true
        }),
    ],
    preview: {
        select: {
            name: 'name',
            genre: 'genre',
            image: 'image'
        },
        prepare({name, genre, image}){
            const nameFormatted = name || 'Artist name not specified';
            return{
                title: nameFormatted,
                subtitle: genre.toUpperCase(),
                media: image ?? FaUser
            }
        }
    }
})