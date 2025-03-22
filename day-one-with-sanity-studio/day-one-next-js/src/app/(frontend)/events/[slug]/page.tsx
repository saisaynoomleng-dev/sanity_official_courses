import { sanityFetch } from "@/sanity/live"
import { defineQuery, PortableText } from "next-sanity"
import Image from "next/image"
import Link from "next/link"

const EVENT_QUERY = defineQuery(`*[_type == 'event'
   && slug.current == $slug][0]{
    _id,
    name,
    headline->{
      name,
      genre
    },
    venue->{
      name,
      address
    },
    dateAndTime,
    doorsOpen,
    slug,
    image{
      asset->{
        url
      }
    },
    details
   }`)

const EventDetailPage = async ({
    params
}: { params: Promise<{ slug: string }> }) => {
    const { data: event } = await sanityFetch({
        query: EVENT_QUERY,
        params: await params
    }) || '';

    const doorOpenTime = (date: string, minutes: number) => {
        return new Date(new Date(date).getTime() - minutes * 60000)
    }


    return (
        <div className="container m-10 mx-auto grid grid-cols-2 gap-10">
            <Link href='/' className="col-span-full">&larr; Back to Main Page</Link>
            <div>
                {event?.image?.asset?.url && (
                    <Image
                        src={event.image.asset.url}
                        width={300}
                        height={300}
                        alt=""
                        priority
                        className="min-w-full rounded-[1rem]" />)}
            </div>

            <div className="flex flex-col gap-4">
                <p className="font-bold text-2xl">{event?.name}</p>
                <p className="font-bold">Artist: <span className="font-normal">{event?.headline?.name}</span></p>
                <p className="font-bold">Date: <span className="font-normal">{event?.dateAndTime && new Date(event?.dateAndTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit', hour: 'numeric', minute: 'numeric' })}</span></p>
                <p className="font-bold">DoorsOpen:  <span className="font-normal">
                    {' '}{event?.dateAndTime && event?.doorsOpen ? (doorOpenTime(event?.dateAndTime, event?.doorsOpen).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: 'numeric'
                    })) : ''}
                </span></p>
                <p className="font-bold">Venue: <span className="font-normal">{event?.venue?.name} ({event?.venue?.address})</span></p>
            </div>

            <div className="col-span-full prose lg:prose-xl min-w-full">
                <PortableText value={event?.details} />
            </div>
        </div >
    )
}

export default EventDetailPage