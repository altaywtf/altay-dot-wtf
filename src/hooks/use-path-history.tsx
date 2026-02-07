import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const usePathHistoryListener = () => {
  const pathname = usePathname();

  useEffect(() => {
    const storage = globalThis?.sessionStorage;
    if (!pathname || !storage) return;
    storage.setItem("PATH_HISTORY", pathname);
  }, [pathname]);
};

export const usePathHistory = () => {
  const storage = globalThis?.sessionStorage;
  if (!storage) return;
  return storage.getItem("PATH_HISTORY");
};
