'use client';
import { useStoreModal } from '@/hooks/use-store-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import Modal from '../ui/modal';
const formSchema = z.object({
  name: z.string().min(1),
});
export function StoreModal() {
  const storeModal = useStoreModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });
  // submit form
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // call api to create store
    await fetch('/api/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(data);

    // close modal
    storeModal.onClose();
  };

  return (
    <Modal
      title='Store Modal'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      description='Manage your store settings'
    >
      <div>
        <div className='space-y-4 py-2 pb-2'>
          {/* use Form from shadcn ui  */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='e-commerce' {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <div className='flex w-full items-center justify-end space-x-2 pt-6'>
                <Button variant='outline' onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button type='submit'>Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
