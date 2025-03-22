import { IoLocation } from "react-icons/io5";
import { defineField, defineType } from "sanity";

export const venueType = defineType({
    name: 'venue',
    title: 'Venue',
    type: 'document',
    icon: IoLocation,
    fields: [
        defineField({
            name: 'name',
            title: 'Venue Name',
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
            name: 'address',
            title: 'Venue Address',
            type: 'string'
        }),
        defineField({
            name: 'description',
            title: 'Venue Description',
            type: 'array',
            of: [{type: 'block'}]
        }),
        defineField({
            name: 'image',
            type: 'image',
            options: {
                hotspot: true
            }
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