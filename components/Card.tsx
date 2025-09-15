import Link from 'next/link'
import React from 'react'

const Card = ({
  name,
  total,
  path,
}: {
  name: string
  total: number
  path: string
}) => {
  return (
    <Link href={path}>
      <div className='flex flex-col items-center justify-center gap-3 p-6 bg-white shadow-xl rounded-xl w-[250px] h-[150px]'>
        <h2 className='text-xl font-bold'>{name}</h2>
        <p className='text-3xl font-bold text-green-800'>{total}</p>
      </div>
    </Link>
  )
}

export default Card
