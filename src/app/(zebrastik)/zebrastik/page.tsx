import Image from 'next/image'
import { zebrastikCopy } from 'config'

const Zebrastik = () => (
  <>
    <div className="relative h-28 w-28 overflow-hidden rounded">
      <Image src="/images/zebra.jpg" alt="zebrastik logo" fill />
    </div>

    <div className="mt-4 flex flex-col gap-2">
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
  </>
)

export default Zebrastik
