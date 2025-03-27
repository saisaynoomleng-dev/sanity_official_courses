import { BiCalendar, BiDetail } from "react-icons/bi";
import { MdPermMedia } from "react-icons/md";
import { defineField, defineType } from "sanity";
import { AdmissionTime } from "./components/AdmissionTime";

export const eventType = defineType({
    name: 'event',
    title: 'Event',
    icon: BiCalendar,
    type: 'document',
    groups: [
        { name: 'details', title: 'Details', icon: BiDetail },
        { name: 'media', title: 'Media', icon: MdPermMedia }
    ],
    fields: [
        defineField({
            name: 'name',
            title: 'Event Name',
            type: 'string',
            group: 'details',
            readOnly: ({ currentUser }) => {
                const isAdmin = currentUser?.roles?.some(role => role.name === 'administrator');

                return !isAdmin
            }
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'details',
            hidden: ({ document }) => !document?.name,
            validation: rule => rule
                .required()
                .warning(`Required to generate a page on the website`)
        }),
        defineField({
            name: 'eventType',
            title: 'Event Type',
            group: 'details',
            type: 'string',
            options: {
                list: [
                    { title: 'Outdoor', value: 'outdoor' },
                    { title: 'Indoor', value: 'indoor' },
                    { title: 'Virtual', value: 'virtual' }
                ],
                layout: 'radio'
            }
        }),
        defineField({
            name: 'dateAndTime',
            title: 'Event Date & Time',
            type: 'datetime',
            validation: rule => rule
                .required()
                .info('Required to present the date on the website'),
            group: 'details'
        }),
        defineField({
            name: 'admission',
            title: 'Admission',
            type: 'number',
            initialValue: 60,
            description:
                <details>
                    <summary>Why this is important?</summary>
                    It's helpful for the customers to plan for the event. Set minutes in number for the admission.
                </details>,
            components: {
                input: AdmissionTime
            },
            group: 'details'
        }),
        defineField({
            name: 'doorsOpen',
            type: 'number',
            initialValue: 60,
            deprecated: {
                reason: 'Name Changed to Admission, use Admission Field Instead!'
            },
            title: 'Doors Open',
            components: {
                input: AdmissionTime
            },
            group: 'details',
            hidden: true
        }),
        defineField({
            name: 'image',
            title: 'Event Banner',
            type: 'image',
            options: {
                hotspot: true
            },

            group: 'media',
            deprecated: {
                reason: 'added alt field, use banner field instead'
            },
            readOnly: true,
            hidden: true
        }),
        defineField({
            name: 'banner',
            title: 'Event Banner',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text',
                    validation: rule => rule
                        .required()
                })
            ],
            group: 'media'
        }),
        defineField({
            name: 'details',
            title: 'Event details',
            description: `It's recommended to provide the event details in at least 100 characters.`,
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
            validation: rule => rule.required().min(100).info('Required to generate a page on the website'),
            group: 'details',
            deprecated: {
                reason: 'Name Changed! use Description field instead',
            },
            readOnly: true,
            hidden: true
        }),
        defineField({
            name: 'description',
            title: 'Event Description',
            description: `It's recommended to provide the event details in at least 100 characters.`,
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
            validation: rule => rule.required().min(100).info('Required to generate a page on the website'),
            group: 'details'
        }),
        defineField({
            name: 'headline',
            title: 'Headline Artist',
            type: 'reference',
            to: [{ type: 'artist' }],
            validation: rule => rule.required(),
            group: 'details'
        }),
        defineField({
            name: 'venue',
            title: 'Event Venue',
            type: 'reference',
            to: [{ type: 'venue' }]
        })
    ],
    preview: {
        select: {
            name: 'name',
            venue: 'venue.name',
            headline: 'headline.name',
            image: 'banner',
            eventDate: 'dateAndTime'
        },
        prepare({ name, venue, headline, image, eventDate }) {
            const nameFormatted = name || 'event name not specified';
            const venueFormatted = venue || 'venue not specified';
            const dateFormatted = new Date(eventDate).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            return {
                title: name ? `${nameFormatted} - ${headline}` : nameFormatted,
                subtitle: venue ? `${venueFormatted}, ${dateFormatted}` : venueFormatted,
                media: image || BiCalendar
            }
        }
    }
})