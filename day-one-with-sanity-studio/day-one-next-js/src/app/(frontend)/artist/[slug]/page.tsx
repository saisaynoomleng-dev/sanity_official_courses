import { sanityFetch } from "@/sanity/live";
import { defineQuery, PortableText } from "next-sanity"
import Image from "next/image";

const ARTIST_DETAIL_QUERY = defineQuery(`*[_type == 'artist'
   && slug.current == $slug][0]{
    image{
      asset->{
        url
      }
    },
    album[]->{
      name,
      releasedDate,
      image{
        asset->{
            url
        }
      }
    },
    genre,
    name,
    slug,
    bio
   }`);

const ArtistDetail = async ({
    params
}: { params: Promise<{ slug: string }> }) => {
    const { data: artist } = await sanityFetch({
        query: ARTIST_DETAIL_QUERY,
        params: await params
    }) || {};

    return (
        <section className="container mx-auto py-10 space-y-10">
            <div className="flex gap-10 ">
                {artist?.image?.asset?.url && (
                    <Image
                        src={artist.image.asset.url}
                        width={300}
                        height={300}
                        alt=""
                        priority
                        className="object-cover" />
                )}

                <div className="flex flex-col gap-3">
                    <h2 className="font-bold">{artist?.name}</h2>
                    <p className="font-bold">Genre: <span className="font-normal capitalize">{artist?.genre}</span></p>

                    <div className="grid grid-cols-3 gap-3">
                        <p className="font-bold col-span-full">Popular Albums: </p>
                        {artist?.album?.map(album => (
                            <div
                                key={album.name}
                                className="flex flex-col p-3 bg-gray-300 rounded-sm cursor-pointer">
                                {album?.image?.asset?.url &&
                                    <Image
                                        src={album.image.asset.url}
                                        width={100}
                                        height={100}
                                        alt=""
                                        priority
                                        className="w-[100px] aspect-square rounded-sm" />
                                }

                                <div className="flex flex-col text-sm">
                                    <p className="font-semibold text-sm">{album.name}</p>
                                    <p>{album.releasedDate && new Date(album.releasedDate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        year: 'numeric',
                                        day: '2-digit'
                                    })}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="prose lg:prose-xl min-w-full">
                <p className="font-semibold text-xl">Bio</p>
                {artist?.bio && <PortableText value={artist.bio} />}
            </div>
        </section>
    )
}

export default ArtistDetail