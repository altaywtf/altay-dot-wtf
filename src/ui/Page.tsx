import Markdown from './Markdown'

type Props = {
  children: React.ReactNode
  header: {
    title: string
    description?: string
  }
}

const Page: React.FC<Props> = ({ header, children }) => (
  <>
    <div className="flex flex-col">
      <h1>{header.title}</h1>
      {header.description ? <Markdown>{header.description}</Markdown> : null}
    </div>

    {children}
  </>
)

export default Page
