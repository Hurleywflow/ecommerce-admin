'use client';
import { StoreModal } from '@/components/modals/store-modal';
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // prevent hydrate errors with ssr and csr
  if (!isMounted) return null;
  return (
    <>
      <StoreModal />
    </>
  );
};

