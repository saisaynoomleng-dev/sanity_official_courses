import { BiDetail } from "react-icons/bi";
import { FaLocationPin } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";
import { defineField, defineType } from "sanity";

export const venueType = defineType({
    name: 'venue',
    title: 'Venue',
    icon: FaLocationPin,
    type: 'document',
    groups: [
        { name: 'details', title: 'Details', icon: BiDetail },
        { name: 'media', title: 'media', icon: MdPermMedia}
    ],
    fieldsets: [
        { name: 'location', title: 'Location', options: { collapsed: false, columns: 2, collapsible: true}},
        
    ],
    fields: [
        defineField({
            name: 'name',
            title: `Venue's Name`,
            type: 'string',
            group: 'details'
        }),
        defineField({
            name: 'slug', 
            title: 'Slug',
            type: 'slug',
            group: 'details',
            hidden: ({document}) => !document?.name,
            validation: rule => rule
                .required(),
        }),
        defineField({
            name: 'venueType',
            title: 'Venue Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Indoor', value: 'indoor' },
                    { title: 'Outdoor', value: 'outdoor'}
                ],
                layout: 'radio'
            },
            fieldset: 'location',
            group: 'details'
        }),
        defineField({
            name: 'address',
            title: 'Venue Address',
            type: 'string',
            group: 'details',
            fieldset: 'location'
        }),
        defineField({
            name: 'city',
            title: `City`,
            type: 'string',
            group: 'details',
            fieldset: 'location'
        }),
        defineField({
            name: 'country',
            title: 'Country',
            type: 'string',
            group: 'details',
            fieldset: 'location'
        }),
        defineField({
            name: 'image',
            title: 'Venue Photo',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: `Alternative Text`,
                    type: 'string',
                    validation: rule => rule
                        .required()
                        .warning(`Required to generate a text for screen reader`)
                })
            ]
        }),
        defineField({
            name: 'description',
            type: 'array',
            of: [{type: 'block'}],
            title: `Venue's Description`
        })
    ],
    preview: {
        select: {
            name: 'name',
            city: 'city',
            country: 'city',
            type: 'venueType',
            address: 'address',
            image: 'image'
        },
        prepare({name, city, country, type, address, image}){
            const nameFormatted = name || 'Untitled Venue';
            const addressFormatted = address || 'Address not Specified';
            
            return{
                title: name ? `${nameFormatted} (${city}, ${country})` : nameFormatted,
                subtitle: `${addressFormatted} (${type.toUpperCase()})`,
                media: image ?? FaLocationPin
            }
        }
    }
})