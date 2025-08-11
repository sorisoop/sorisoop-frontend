/**
 * Blob을 ObjectURL로 변환하고 생명주기 관리하는 훅
 */

import { useEffect, useMemo, useState } from "react";

/**
 * useObjectUrl
 *
 * Blob을 받아 브라우저에서 접근 가능한 ObjectURL을 생성하고,
 * 컴포넌트 언마운트 또는 Blob 변경 시 URL을 해제하는 훅.
 *
 * - Blob이 null이면 기존 URL을 해제하고 상태를 초기화
 * - Blob이 새로 들어오면 URL을 새로 생성
 * - URL 해제는 브라우저 메모리 누수 방지를 위해 필수
 *
 * @param inputBlob 변환할 Blob 객체. null이면 URL을 생성하지 않음.
 * @returns objectUrl: 생성된 ObjectURL (string | null)
 *          meta: Blob 메타데이터(size, type)
 */

export const useObjectUrl = (inputBlob: Blob | null) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!inputBlob) {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        setObjectUrl(null);
      }
      return;
    }
    const nextUrl = URL.createObjectURL(inputBlob);
    setObjectUrl(nextUrl);
    return () => {
      URL.revokeObjectURL(nextUrl);
    };
  }, [inputBlob]);

  const meta = useMemo(() => (inputBlob ? { size: inputBlob.size, type: inputBlob.type } : null), [inputBlob]);

  return { objectUrl, meta };
};
