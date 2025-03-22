import { BiDetail } from "react-icons/bi";
import { MdAlbum, MdPermMedia } from "react-icons/md";
import { defineField, defineType } from "sanity";

export const albumType = defineType({
    name: 'album',
    type: 'document',
    icon: MdAlbum,
    groups: [
        { name: 'detail', title: 'Detail', icon: BiDetail},
        { name: 'media', title: 'Media', icon: MdPermMedia}
    ],
    fields: [
        defineField({
            name: 'name',
            title: 'Album Name',
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
            hidden: ({document}) => !document?.name
        }),
        defineField({
            name: 'artist',
            title: 'Artist',
            type: 'string',
            group: 'detail',
        }),
        defineField({
            name: 'releasedDate',
            title: 'Released Date',
            type: 'date',
            group: 'detail',
            hidden: ({document}) => !document?.name
        }),
        defineField({
            name: 'image',
            title: 'Album Photo',
            type: 'image',
            options: {
                hotspot: true
            },
            group: 'media',
        })
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            date: 'releasedDate',
            artist: 'artist'
        },
        prepare({title, media, date, artist}){
            const dateFormatted = new Date(date).getFullYear();

            const artistFormatted = artist || 'Artist not specified'
            
            return{
                title: `${title} (${artistFormatted})`,
                subtitle: date ? `(${dateFormatted})` : 'Released Date not specified',
                media
            }
        }
        
    }
})