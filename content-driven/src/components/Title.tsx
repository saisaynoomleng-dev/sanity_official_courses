
type TitleProps = {
    children: React.ReactNode
}

const Title = ({ children }: TitleProps) => {
    return (
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold text-slate-800 text-pretty max-w-3xl">
            {children}
        </h1>
    )
}

export default Title