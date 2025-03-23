import { sanityFetch } from "@/sanity/live"
import { defineQuery } from "next-sanity"
import Image from "next/image";
import Link from "next/link";

const ARTISTS_QUERY = defineQuery(`*[_type == 'artist'
   && defined(slug.current)]{
    image{
      asset->{
        url
      }
    },
    genre,
    name,
    slug,
   }`)

const Artists = async () => {
    const { data: artists } = await sanityFetch({ query: ARTISTS_QUERY });

    return (
        <section className="container mx-auto">
            <h2 className="text-3xl font-bold">All Artists</h2>

            <div className="grid grid-cols-3 gap-5 place-items-center">
                {artists.map(artist => (
                    <Link
                        href={`/artist/${artist?.slug?.current}`}
                        key={artist?.slug?.current}
                        className="flex flex-col w-[200px] cursor-pointer transition-all transform hover:scale-110 ">
                        {artist?.image?.asset?.url && (
                            <div className="relative">
                                <Image
                                    src={artist.image.asset.url}
                                    width={300}
                                    height={300}
                                    priority
                                    alt=""
                                    className="object-cover h-[200px] mx-auto rounded-lg transition-transform duration-300 transform hover:scale-110"
                                />

                            </div>
                        )}

                        <p className="font-bold flex justify-between">
                            <span>
                                {artist.name}
                            </span>
                            <span className="text-orange-600">
                                {artist.genre?.toUpperCase()}
                            </span>
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Artists