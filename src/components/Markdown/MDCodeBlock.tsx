import { Box } from 'theme-ui'
import { PrismLight } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'

PrismLight.registerLanguage('jsx', jsx)
PrismLight.registerLanguage('tsx', tsx)

type Props = { language: string; value: string }

const PrislmLightAny = PrismLight as any // @todo: react 18

const MDCodeBlock: React.FC<Props> = ({ language, value }) => (
  <Box my={3}>
    <PrislmLightAny style={dark} language={language} customStyle={{ borderRadius: '4px' }}>
      {value}
    </PrislmLightAny>
  </Box>
)

export default MDCodeBlock
