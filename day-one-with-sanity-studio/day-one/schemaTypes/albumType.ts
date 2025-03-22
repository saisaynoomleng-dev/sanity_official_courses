import { MdAlbum } from "react-icons/md";
import { defineField, defineType } from "sanity";

export const albumType = defineType({
    name: 'album',
    type: 'document',
    icon: MdAlbum,
    fields: [
        defineField({
            name: 'name',
            title: 'Album Name',
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
            name: 'artist',
            title: 'Artist',
            type: 'string'
        }),
        defineField({
            name: 'releasedDate',
            title: 'Released Date',
            type: 'date'
        }),
        defineField({
            name: 'image',
            title: 'Album Photo',
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