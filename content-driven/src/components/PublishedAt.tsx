import { POST_QUERYResult } from "@/sanity/types"

type PublishedAtProps = {
    publishedAt: NonNullable<POST_QUERYResult>['publishedAt']
}

const PublishedAt = ({ publishedAt }: PublishedAtProps) => {
    return publishedAt ? (
        <p className="text-base text-slate-700">
            {new Date(publishedAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })}
        </p>
    ) : null
}

export default PublishedAt