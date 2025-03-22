import { FaUser } from "react-icons/fa";
import { IoCalendarSharp, IoLocation } from "react-icons/io5";
import { MdAlarm, MdAlbum } from "react-icons/md";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
    S.list()
        .id('root')
        .title('Contents')
        .items([
            S.documentTypeListItem('event').title('All Events').icon(IoCalendarSharp),
            S.listItem()
                .title('Upcoming Events')
                .schemaType('event')
                .icon(IoCalendarSharp)
                .child(S.documentList().title('Upcoming Events').filter('dateAndTime >= now()')),
            S.listItem()
                .title('Past Events')
                .schemaType('event')
                .icon(IoCalendarSharp)
                .child(S.documentList().title('Past Events').filter('dateAndTime < now()')),
            S.divider(),
            S.documentTypeListItem('artist').title('All Artists').icon(FaUser),
            S.documentTypeListItem('venue').title('All Venues').icon(IoLocation),
            S.divider(),
            S.documentTypeListItem('album').title('All Albums').icon(MdAlbum)
        ])