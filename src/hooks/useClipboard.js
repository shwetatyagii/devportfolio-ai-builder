import { useState, useCallback } from "react";

const useClipboard = (resetDelay = 2000) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        setTimeout(() => setCopied(false), resetDelay);
      } catch {
        setError("Copy failed — please select and copy manually.");
        setTimeout(() => setError(null), resetDelay);
      }
    },
    [resetDelay],
  );

  return { copy, copied, error };
};

export default useClipboard;
