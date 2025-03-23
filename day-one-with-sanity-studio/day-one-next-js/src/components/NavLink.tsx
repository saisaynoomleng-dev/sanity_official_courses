'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
    name: string
    url: string
}

const NavLink = ({ url, name }: Props) => {
    const pathname = usePathname();

    return (
        <Link
            href={url}
            className={clsx('font-mono text-lg',
                pathname === url && 'underline font-semibold'
            )}
        >{name}
        </Link>
    )
}

export default NavLink