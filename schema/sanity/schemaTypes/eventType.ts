import { FaCalendar } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export const eventType = defineType({
    name: 'event',
    type: 'document',
    icon: FaCalendar,
    fields: [
        defineField({
            name: 'name',
            type: 'string'
        }),
        defineField({
            name: 'slug',
            type: 'slug'
        }),
        defineField({
            name: 'venue',
            type: 'reference',
            to: [{type: 'venue'}]
        }),
        defineField({
            name: 'date',
            type: 'datetime'
        }),
        defineField({
            name: 'headline',
            type: 'reference',
            to: [{type: 'artist'}]
        }),
        defineField({
            name: 'doorsOpen',
            type: 'number',
            initialValue: 60
        }),
        defineField({
            name: 'image',
            type: 'image'
        }),
        defineField({
            name: 'eventType',
            type: 'string',
            options: {
                list: ['in-person', 'virtual']
            },
            deprecated: {
                reason: 'Use the "Event Format" field instead'
            },
            readOnly: true,
            hidden: true
        }),
        defineField({
            name: 'tickets',
            type: 'url'
        }),
        defineField({
            name: 'details',
            type: 'array',
            of: [{type: 'block'}]
        }),
        defineField({
            name: 'format',
            type: 'string',
            options: {
                list: ['in-person', 'virtual'],
                layout: 'radio'
            },
            validation: rule => rule.required()
        })
    ]
})