import { MoveLeft } from "lucide-react";

const SITE_TITLE = "altay.wtf";

const BackButton: React.FC<{
  href?: string;
  label?: string;
}> = ({ href = "/", label = SITE_TITLE }) => {
  const handleClick = () => {
    const storage = globalThis?.sessionStorage;
    const prevPath = storage?.getItem("PATH_HISTORY");

    if (prevPath === href) {
      window.history.back();
    } else {
      window.location.href = href;
    }
  };

  const content = (
    <span className="flex items-center gap-1 text-neutral-400 hover:text-neutral-300">
      <MoveLeft className="mt-0.5" />
      {label}
    </span>
  );

  return (
    <button className="cursor-pointer" onClick={handleClick} type="button">
      {content}
    </button>
  );
};

export default BackButton;
