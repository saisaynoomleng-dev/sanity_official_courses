import { sanityFetch } from '@/sanity/live';
import { defineQuery } from 'next-sanity'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {}

const EVENTS_QUERY = defineQuery(`*[_type == 'event'
   && defined(slug.current)]{
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
    }
   } | order(date desc)`);

const HomePage = async (props: Props) => {
  const { data: events } = await sanityFetch({ query: EVENTS_QUERY });

  if (!events) {
    return <p>No Events Found!</p>
  }

  const doorOpenTime = (date: string, minutes: number) => {
    return new Date(new Date(date).getTime() - minutes * 60000)
  }

  return (
    <main className='container mx-auto'>
      <h1 className="text-2xl font-bold">Welcome to Live Events</h1>

      <div className='grid grid-cols-1 gap-10 mt-10  p-2'>
        {events.map(event => (
          <Link
            href={`/events/${event?.slug?.current}`}
            key={event?.slug?.current}
            className='flex gap-2 bg-gray-100 p-5 cursor-pointer'>
            <div className='min-w-[10rem]'>
              {event?.image?.asset?.url && (
                <Image
                  src={event?.image?.asset?.url}
                  width={80}
                  height={80}
                  alt=''
                  priority
                  className='w-full object-cover' />
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className="font-semibold">
                {event?.name} ({event?.headline?.name})
              </h3>

              <p>
                {event?.venue?.address && (
                  <span className='font-semibold'>
                    {event?.venue?.name} {event?.venue?.address}
                  </span>
                )

                }

                {event?.dateAndTime && (
                  <span>
                    &nbsp;{new Date(event?.dateAndTime).toLocaleDateString('en-US', {
                      day: '2-digit',
                      year: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                )}

              </p>

              <p>Doors Open:
                <span>
                  {' '}{event?.dateAndTime && event?.doorsOpen ? (doorOpenTime(event?.dateAndTime, event?.doorsOpen).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: 'numeric'
                  })) : ''}
                </span>
              </p>
            </div>
          </Link>
        ))

        }

      </div>

    </main>
  )
}

export default HomePage