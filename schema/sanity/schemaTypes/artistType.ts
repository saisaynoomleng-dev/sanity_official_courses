import { defineField, defineType } from "sanity";

export const artistType = defineType({
    name: 'artist',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string'
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name'
            }
        }),
        defineField({
            name: 'photo',
            type: 'image',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'description',
            type: 'text'
        })
    ]
})