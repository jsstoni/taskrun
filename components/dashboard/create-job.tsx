'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { addJob } from '@/lib/actions/add-job';
import { JobValues, schemaJobs } from '@/lib/validations/job';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Plus } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export function CreateJob() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<JobValues>({
    resolver: zodResolver(schemaJobs),
    defaultValues: {
      name: '',
      quickSchedule: ['*/30', '*', '*', '*', '*'],
      command: '',
      metaData: '{}',
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'quickSchedule',
  });

  const { executeAsync } = useAction(addJob, {
    onSuccess: () => {
      closeDialog();
    },
    onError: ({ error }) => {
      form.setError('root', { message: error.serverError });
    },
  });

  const onSubmit = async (data: JobValues) => {
    await executeAsync(data);
  };

  const closeDialog = () => {
    setIsOpen((s) => !s);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogTrigger asChild>
        <Button
          className="mt-2 w-full justify-start"
          size="sm"
          variant="outline"
        >
          <Plus /> Create Schedule
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-lg">
        <DialogHeader>
          <DialogTitle>Create Scheduled</DialogTitle>
          <DialogDescription>
            Define when and where to send your HTTP request.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Quick schedule</FormLabel>
              <div className="grid grid-cols-5 gap-2">
                {fields.map((item, index) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`quickSchedule.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="*"
                            {...field}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) => {
                              const value = e.target.value;
                              const valid = /^[0-9+\-*/().\s]*$/;
                              if (valid.test(value)) {
                                field.onChange(value === '' ? '*' : value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="command"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input className="pl-8" {...field} />
                      <Link
                        size={15}
                        className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payload</FormLabel>
                  <FormControl>
                    <Textarea placeholder={'{\n  "title": ""\n}'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className="text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
