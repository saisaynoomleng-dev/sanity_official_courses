import { BiDetail } from "react-icons/bi";
import { FaLocationPin } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";
import { defineArrayMember, defineField, defineType } from "sanity";
import DoorsOpenInput from "./components/DoorsOpenInput";

export const eventType = defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    groups: [
        { title: 'Detail', name: 'detail', icon: BiDetail },
        { title: 'Media', name: 'media', icon: MdPermMedia }
    ],
    fields: [
        defineField({
            name: 'name',
            title: 'Event Name',
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
                .error('Required to generate a page on the website'),
            hidden: ({ document }) => !document?.name,
            group: 'detail',
        }),
        defineField({
            name: 'eventType',
            title: 'Event Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Outdoor', value: 'outdoor' },
                    { title: 'Indoor', value: 'indoor' },
                    { title: 'Virtual', value: 'virtual' }
                ],
                layout: 'radio'
            },
            validation: rule => rule
                .required()
                .warning(`Required to further confrim the audience of what event type is`),
            group: 'detail',
        }),
        defineField({
            name: 'dateAndTime',
            title: 'Event Date & Time',
            type: 'datetime',
            group: 'detail',
        }),
        defineField({
            name: 'doorsOpen',
            description: 'Number of minutes before the start time for admission',
            title: 'Door Opening Time',
            type: 'number',
            initialValue: 60,
            group: 'detail',
            components: {
                input: DoorsOpenInput
            }
        }),
        defineField({
            name: 'venue',
            title: 'Event Venue',
            type: 'reference',
            to: [{ type: 'venue' }],
            readOnly: ({ value, document }) => !value && document?.eventType === 'virtual',
            validation: rule => rule.custom((value, context) => {
                if (value && context?.document?.eventType === 'virtual') {
                    return 'Only in-person events can have a venue'
                }
                return true;
            }),
            group: 'detail',
        }),
        defineField({
            name: 'headline',
            title: 'Event Headline Artists',
            type: 'reference',
            to: [{ type: 'artist' }],
            group: 'detail',
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true
            },
            group: 'media',
        }),
        defineField({
            name: 'details',
            title: 'Event Details',
            type: 'array',
            of: [
                defineArrayMember(
                    { type: 'block' }
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
            ],
            group: 'detail',
        }),
        defineField({
            name: 'tickets',
            type: 'url',
            title: 'Event Tickets',
            group: 'detail'
        }),
    ],
    preview: {
        select: {
            name: 'name',
            artist: 'headline.name',
            location: 'venue.name',
            address: 'venue.address',
            date: 'date',
            image: 'image'
        },
        prepare({ name, artist, location, address, date, image }) {
            const nameFormatted = name || 'Event Name not Specified';
            const dateFormatted = new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: 'numeric',
                minute: '2-digit'
            });
            const locationFormatted = location ? location : 'location not specified';

            return {
                title: name ? `${nameFormatted} (${artist})` : nameFormatted,
                subtitle: `${locationFormatted} • ${address} • ${dateFormatted}`,
                media: image ?? FaLocationPin
            }
        }
    }
})