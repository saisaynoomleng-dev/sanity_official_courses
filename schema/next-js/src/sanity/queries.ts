import { defineQuery } from "next-sanity";

export const EVENT_QUERY = defineQuery(`*[_type == 'event'
   && slug.current == $slug][0]{
  ...,
  "eventType": coalesce(format, eventType),
    headline->,
    venue->
   }`)

export const EVENTS_QUERY = defineQuery(`*[_type == 'event'
 && defined(slug.current)]{
  name,
  slug,
  headline->,
  venue,
  date,
  doorsOpen
 }`)