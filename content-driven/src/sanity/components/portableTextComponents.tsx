import { PortableTextComponents } from "next-sanity";
import Image from "next/image";
import { urlFor } from "../lib/image";

export const components: PortableTextComponents = {
    types: {
        image: (props) => props.value ? (
            <Image
                src={urlFor(props.value)
                    .width(600)
                    .height(400)
                    .auto('format')
                    .quality(80)
                    .url()
                }
                width={600}
                height={400}
                alt={props?.value?.alt || ''}
                priority />
        ) : null
    }
}