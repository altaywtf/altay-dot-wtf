import type { Metadata } from 'next'

import { zebrastikCopy } from '@/config'
import Image from 'next/image'

export const metadata: Metadata = {
  description: zebrastikCopy.description,
  openGraph: {
    description: zebrastikCopy.description,
    title: 'zebrastik',
  },
  title: 'zebrastik',
}

export default function Page() {
  return (
    <>
      <div className="relative h-28 w-28 overflow-hidden rounded border border-solid border-neutral-900">
        <Image alt="zebrastik logo" fill src="/images/zebra.jpg" />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <h1>{zebrastikCopy.title}</h1>
        <p className="text-neutral-400">{zebrastikCopy.description}</p>
      </div>

      <hr className="my-8" />

      <a
        className="text-neutral-400 hover:text-neutral-300"
        href="mailto:altay@zebrastik.com"
      >
        altay@zebrastik.com
      </a>

      <div className="mt-4 text-neutral-400">
        <p>zebrastik, LLC</p>
        <p>30 N Gould St, STE 4000</p>
        <p>Sheridan, WY 82801</p>
      </div>
    </>
  )
}
