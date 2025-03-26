import { BiCalendar } from "react-icons/bi";
import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) => 
    S.list()
        .id('root')
        .title('Contents')
        .items([
            S.listItem()
                .title('Upcoming Events')
                .icon(BiCalendar)
                .schemaType('event')
                .child(S.documentList().title('Upcoming Events').filter('dateAndTime >= now()')),
            
        ])