import { BiAlbum, BiCalendar } from "react-icons/bi";
import { FaCalendar, FaUser } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) => 
    S.list()
        .id('root')
        .title('Contents')
        .items([
            S.documentTypeListItem('event').title('All Events').icon(BiCalendar),
            S.divider(),
            S.listItem()
                .title('Upcoming Events')
                .icon(BiCalendar)
                .schemaType('event')
                .child(S.documentList().title('Upcoming Events').filter('dateAndTime >= now()')),
            S.listItem()
                .title('Previous Events')
                .icon(BiCalendar)
                .schemaType('event')
                .child(S.documentList().title('Previous Events').filter('dateAndTime <= now()')),
            S.divider(),
            S.documentTypeListItem('artist').title('All Artists').icon(FaUser),
            S.documentTypeListItem('album').title('All Albums').icon(BiAlbum),
            S.divider(),
            S.documentTypeListItem('venue').title('All Venues').icon(FaLocationPin),
        ])