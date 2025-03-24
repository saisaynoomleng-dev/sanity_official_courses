import { defineField, defineType } from "sanity";

export const venueType = defineType({
    name: 'venue',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string'
        }),
        defineField({
            name: 'address',
            type: 'string'
        }),
        defineField({
            name: 'image',
            type: 'image',
            options:{
                hotspot: true
            }
        }),
        defineField({
            name: 'city',
            type: 'string'
        }),
        defineField({
            name: 'country',
            type: 'string'
        })
    ]
})