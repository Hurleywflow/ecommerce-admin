'use client';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';
export default function SetupPage() {
  // hooks/use-store-modal + ui/modal goto modals/store-modal and then goto providers/modal-provider
  // open modal on mount but can not close if it is not create a store
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  useEffect(() => {
    if(!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div className='p-4'>root page</div>;
}
