import { Markdown } from "./md";

type Props = {
  children: React.ReactNode;
  header: {
    description?: string;
    title: string;
  };
};

export const Page: React.FC<Props> = ({ children, header }) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">{header.title}</h1>
      {header.description ? <Markdown>{header.description}</Markdown> : null}
    </div>

    {children}
  </div>
);
