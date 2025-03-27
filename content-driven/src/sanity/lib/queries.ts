import { defineQuery } from "next-sanity"

export const POSTS_QUERY = defineQuery(`*[_type == 'post'
   && defined(slug.current)][0...12]{
  _id,
  slug,
  title,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[] -> {
      _id,
      slug,
      title
    }, []
  ),
    author->{
      name,
      image
    }
   } | order(publishedAt desc)`);

export const POSTS_SLUGS_QUERY = defineQuery(`*[_type == 'post' 
 && defined(slug.current)]{
  "slug" : slug.current
 }`)

export const POST_QUERY = defineQuery(`*[_type == 'post'
  && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[] -> {
      _id,
      title,
      slug
    }
  ),
  author->{
    name,
    image
  }
  }`)

