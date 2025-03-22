import { BiDetail } from "react-icons/bi";
import { IoLocation } from "react-icons/io5";
import { MdPermMedia } from "react-icons/md";
import { defineField, defineType } from "sanity";

export const venueType = defineType({
    name: 'venue',
    title: 'Venue',
    type: 'document',
    icon: IoLocation,
    groups: [
        { name: 'detail', title: 'Detail', icon: BiDetail},
        { name: 'media', title: 'Media', icon: MdPermMedia}
    ],
    fields: [
        defineField({
            name: 'name',
            title: 'Venue Name',
            type: 'string',
            group: 'detail'
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
                .error(`Required to generate a page on the website`),
            hidden: ({document}) => !document?.name,
            group: 'detail'
        }),
        defineField({
            name: 'address',
            title: 'Venue Address',
            type: 'string',
            validation: rule => rule
                .required()
                .warning(`Required to add address for the outdoor venue`),
            group: 'detail'
        }),
        defineField({
            name: 'description',
            title: 'Venue Description',
            type: 'array',
            of: [{type: 'block'}],
            group: 'detail'
        }),
        defineField({
            name: 'image',
            type: 'image',
            options: {
                hotspot: true
            },
            group: 'media'
        })
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            address: 'address'
        },
        prepare({title, media, address}){
            return{
                title,
                subtitle: address,
                media
            }
        }
    }
})