import { useEffect, useState } from 'react';

export default function useSlowLoadWarning(loading, delayMs = 4000) {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShowWarning(false);
      return;
    }

    const timer = setTimeout(() => setShowWarning(true), delayMs);
    return () => clearTimeout(timer);
  }, [loading, delayMs]);

  return showWarning;
}
