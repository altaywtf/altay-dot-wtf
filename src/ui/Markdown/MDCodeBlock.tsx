import { PrismLight } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'
import { CodeProps } from 'react-markdown/lib/ast-to-react'

PrismLight.registerLanguage('jsx', jsx)
PrismLight.registerLanguage('tsx', tsx)

const PrislmLightAny = PrismLight as any // @todo: react 18

const MDCodeBlock: React.FC<CodeProps> = (props) => {
  const language = props.className?.replace(/language-/, '') || 'tsx'

  return (
    <div className="my-3">
      <PrislmLightAny style={dark} language={language} customStyle={{ borderRadius: '4px' }}>
        {props.children}
      </PrislmLightAny>
    </div>
  )
}

export default MDCodeBlock
