import { POST_QUERYResult } from '@/sanity/types'

type CategoriesProps = {
    categories: NonNullable<POST_QUERYResult>['categories']
}

const Categories = ({ categories }: CategoriesProps) => {
    return categories?.map(category => (
        <span
            className="bg-cyan-50 rounded-full px-2 py-1 leading-none whitespace-nowrap text-sm font-semibold text-cyan-700"
            key={category._id}>
            {category.title}
        </span>
    ))
}

export default Categories