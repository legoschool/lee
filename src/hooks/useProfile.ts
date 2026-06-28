/**
 * useProfile — 프로필 데이터를 비동기로 불러오는 React 훅
 *
 * 사용 예:
 *   const { data, source, loading, error } = useProfile();
 */
import { useEffect, useState } from "react";
import { loadProfile, type LoadResult } from "@/data/loadProfile";

export interface UseProfileState extends Partial<LoadResult> {
  loading: boolean;
}

export function useProfile(): UseProfileState {
  const [state, setState] = useState<UseProfileState>({ loading: true });

  useEffect(() => {
    let cancelled = false;
    loadProfile().then((result) => {
      if (!cancelled) setState({ ...result, loading: false });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
