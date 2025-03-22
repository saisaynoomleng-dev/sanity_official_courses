import { defineArrayMember, defineField, defineType } from "sanity";

export const eventType = defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Event Name',
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
            name: 'eventType',
            title: 'Event Type',
            type: 'string',
            options: {
                list: [
                    {title: 'Outdoor', value: 'outdoor'},
                    {title: 'Indoor', value: 'indoor'},
                    {title: 'Virtual', value: 'virtual'}
                ],
                layout: 'radio'
            }
        }),
        defineField({
            name: 'date',
            title: 'Event Date & Time',
            type: 'datetime'
        }),
        defineField({
            name: 'doorsOpen',
            title: 'Door Opening Time',
            type: 'number',
            initialValue: 60
        }),
        defineField({
            name: 'venue',
            title: 'Event Venue',
            type: 'reference',
            to: [{type: 'venue'}]
        }),
        defineField({
            name: 'headline',
            title: 'Event Headline Artists',
            type: 'reference',
            to: [{type: 'artist'}]
        }),
        defineField({
            name: 'iamge',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'details',
            title: 'Event Details',
            type: 'array',
            of: [
                defineArrayMember(
                    {type: 'block'}
                ),
                defineArrayMember({
                    type: 'image',
                    title: 'Image',
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string'
                        })
                    ]
                })
            ]
        }),
        defineField({
            name: 'tickets',
            type: 'url',
            title: 'Event Tickets'
        })
    ]
})