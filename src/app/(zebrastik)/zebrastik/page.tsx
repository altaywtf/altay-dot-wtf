import Image from 'next/image'
import { zebrastikCopy } from 'config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'zebrastik',
  description: zebrastikCopy.description,
  openGraph: {
    title: 'zebrastik',
    description: zebrastikCopy.description,
  },
}

export default function Page() {
  return (
    <section className="app-width px-4 py-8 sm:px-0">
      <div className="relative h-28 w-28 overflow-hidden rounded border border-solid border-neutral-900">
        <Image src="/images/zebra.jpg" alt="zebrastik logo" fill />
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <h1>{zebrastikCopy.title}</h1>
        <p className="text-neutral-400">{zebrastikCopy.description}</p>
      </div>

      <hr className="my-8" />

      <a href="mailto:altay@zebrastik.com">altay@zebrastik.com</a>

      <div className="mt-4 text-neutral-400">
        <p>zebrastik, LLC</p>
        <p>30 N Gould St, STE 4000</p>
        <p>Sheridan, WY 82801</p>
      </div>
    </section>
  )
}
