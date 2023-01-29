'use client'

import Image from 'next/image'
import { zebrastikCopy } from 'config'
import { Box, Heading, Link, Text } from 'theme-ui'

const Zebrastik = () => (
  <>
    <Box
      sx={{
        width: 100,
        height: 100,
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Image src="/images/zebra.jpg" alt="zebrastik logo" fill />
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
        <Text color="textSecondary">zebrastik, LLC</Text>
      </Box>

      <Box>
        <Text color="textSecondary">30 N Gould St, STE 4000</Text>
      </Box>

      <Box>
        <Text color="textSecondary">Sheridan, WY 82801</Text>
      </Box>
    </Box>
  </>
)

export default Zebrastik
