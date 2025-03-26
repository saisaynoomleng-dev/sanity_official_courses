import { BiDetail } from "react-icons/bi";
import { MdAlbum, MdPermMedia } from "react-icons/md";
import { defineArrayMember, defineField, defineType } from "sanity";

export const albumType = defineType({
    name: 'album',
    type: 'document',
    icon: MdAlbum,
    fieldsets: [
        {name: 'detail', title: 'Detail', options: { collapsed: false, columns: 2, collapsible: true}}
    ],
    groups: [
        { name: 'details', title: 'Details', icon: BiDetail},
        { name: 'media', title: 'Media', icon: MdPermMedia}
    ],
    fields: [
        defineField({
            name: 'name',
            title: 'Album Name',
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
            group: 'details',
            validation: rule => rule
                .required()
                .info(`Requried to generate a page on the website`)
        }),
        defineField({
            name: 'releasedDate',
            title: 'Released Date',
            type: 'date',
            fieldset: 'detail',
            group: 'details',
            validation: rule => rule
                .required()
                .info('Requried to generate a page on the website')
        }),
        defineField({
            name: 'artist',
            title: 'Artist',
            type: 'reference',
            to: [{type: 'artist'}],
            fieldset: 'detail',
            group: 'details',
            validation: rule => rule
                .required()
                .info('Requried to generate a page on the website')
        }),
        defineField({
            name: 'image',
            type: 'image',
            title: 'Album Cover',
            options: {
                hotspot: true
            },
            group: 'media',
            fields: [
               {
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string'
                }
            ]
        }),
        defineField({
            name: 'description',
            title: 'Album Description',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block'
                })
            ]
        })
    ],
    preview: {
        select: {
            albumName: 'name',
            artistName: 'artist.name',
            image: 'image',
            releasedDate: 'releasedDate'
        },
        prepare({albumName, artistName, image, releasedDate}){
            const albumNameFormatted = albumName || 'Album name not specified';
            const artistNameFormatted = artistName || 'Artist name not specified';
            const releasedDateFormatted = new Date(releasedDate).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });

            return {
                title: albumNameFormatted,
                subtitle: `${artistNameFormatted}, Released On ${releasedDateFormatted}`,
                media: image || MdAlbum
            }
        }
    }
})