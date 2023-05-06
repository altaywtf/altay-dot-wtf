'use client'

import Page from 'ui/Page'
import Markdown from 'ui/Markdown'
import { Box } from 'theme-ui'

const TimelinePage: React.FC<{ data: string }> = ({ data }) => (
  <Page header={{ title: 'Timeline' }}>
    <Box
      sx={{
        ul: { marginLeft: 0 },
        li: {
          listStyleType: 'none',
          marginBottom: 3,
          '> strong:first-of-type': {
            color: 'text',
          },
        },
        hr: { marginY: 4 },
        a: { variant: 'links.underline' },
      }}
    >
      <Markdown>{data}</Markdown>
    </Box>
  </Page>
)

export default TimelinePage
