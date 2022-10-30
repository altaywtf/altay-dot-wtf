import { useEffect, useState } from 'react'
import Image from 'next/image'
import { zebrastikCopy } from 'config'
import { Box, Heading, Link, Text } from 'theme-ui'
import { NextSeo } from 'next-seo'

const Zebrastik = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const header = document.getElementsByTagName('header')[0]

    if (header) {
      header.style.display = 'none'
    }

    setIsMounted(true)
  }, [])

  return isMounted ? (
    <>
      <NextSeo
        title="zebrastik"
        titleTemplate="%s"
        description={zebrastikCopy.description}
        openGraph={{
          title: 'zebrastik',
          description: zebrastikCopy.description,
        }}
      />

      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image src="/images/zebra.png" alt="zebrastik logo" fill />
      </Box>

      <Box my={3} />

      <Heading>{zebrastikCopy.title}</Heading>

      <Box my={2} />

      <Text color="textSecondary">{zebrastikCopy.description}</Text>

      <Box my={4}>
        <hr />
      </Box>

      <Box>
        <Link color="white" href="mailto:altay@zebrastik.com">
          altay@zebrastik.com
        </Link>
      </Box>

      <Box mt={3}>
        <Box>
          <Text color="textSecondary">zebrastik, LLC.</Text>
        </Box>

        <Box>
          <Text color="textSecondary">30 N Gould St, STE 4000</Text>
        </Box>

        <Box>
          <Text color="textSecondary">Sheridan, WY 82801</Text>
        </Box>
      </Box>
    </>
  ) : null
}

export default Zebrastik
