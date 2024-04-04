"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const useSearchQuery = (querySearch: string) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const query = searchParams.get(querySearch) || "";

  const handleSearchQuery = useCallback(
    (valueChange: string) => {
      const params = new URLSearchParams(searchParams);
      if (!!valueChange) {
        params.set(querySearch, valueChange);
      } else {
        params.delete(querySearch);
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams, querySearch]
  );

  const handleDeleteQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete(querySearch);
    replace(`${pathname}?${params.toString()}`);
  }, [pathname, querySearch, replace, searchParams]);

  return { handleSearchQuery, query, handleDeleteQuery };
};

export default useSearchQuery;
