import Image from 'next/image'
import { zebrastikCopy } from 'config/copy'
import { Box, Heading, Link, Text } from 'theme-ui'
import zebraJPG from '../../public/images/zebra.jpg'
import { useEffect } from 'react'

const Zebrastik = () => {
  useEffect(() => {
    const header = document.getElementsByTagName('header')[0]

    if (header) {
      header.style.display = 'none'
    }
  }, [])

  return (
    <Box>
      <Box sx={{ width: 100, height: 100, borderRadius: '8px', overflow: 'hidden' }}>
        <Image src={zebraJPG} alt="zebrastik" />
      </Box>

      <Box my={3} />

      <Heading>{zebrastikCopy.title}</Heading>

      <Box my={2} />

      <Text color="textSecondary">{zebrastikCopy.description}</Text>

      <Box my={4}>
        <hr />
      </Box>

      <Box>
        <Link color="white" href="mailto:hey@zebrastik.com">
          hey@zebrastik.com
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
    </Box>
  )
}

export default Zebrastik
