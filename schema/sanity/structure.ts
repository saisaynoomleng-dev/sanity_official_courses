import { FaCalendar } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) => 
    S.list()
        .title('Content')
        .id('root')
        .items([
            S.documentTypeListItem('event').title('Events').icon(FaCalendar),
            S.divider(),
            S.listItem()
                .title('Upcoming Events')
                .schemaType('event')
                .icon(FaCalendar)
                .child(S.documentList().title('Upcoming Events').filter('date >= now()')),
            S.listItem()
                .title('Previous Event')
                .schemaType('event')
                .icon(FaCalendar)
                .child(S.documentList().title('Previous Event').filter('date <= now()')),
            S.divider(),
            S.documentTypeListItem('venue').title('All venue').icon(FaLocationPin)
        ])