'use client';

import { Field } from '@/components/form/field';
import { FieldSelect } from '@/components/form/field-select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormLabel } from '@/components/ui/form';
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
        <Button className="justify-start" size="sm" variant="outline">
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
            <Field
              control={form.control}
              name="name"
              label="Schedule name"
              render={(field) => <Input {...field} />}
            />

            <div className="space-y-2">
              <FormLabel>Quick schedule</FormLabel>
              <div className="grid grid-cols-5 gap-2">
                {fields.map((item, index) => (
                  <Field
                    key={item.id}
                    control={form.control}
                    name={`quickSchedule.${index}`}
                    render={(field) => (
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
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Field
                control={form.control}
                name="command"
                label="Target URL"
                className="flex-1"
                render={(field) => (
                  <div className="relative">
                    <Input className="pl-8" {...field} />
                    <Link
                      size={15}
                      className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                )}
              />

              <FieldSelect
                control={form.control}
                name="method"
                label="Method"
                placeholder="Select method"
                items={[
                  { name: 'POST', value: 'POST' },
                  { name: 'PUT', value: 'PUT' },
                  { name: 'DELETE', value: 'DELETE' },
                ]}
              />
            </div>

            <Field
              control={form.control}
              name="metaData"
              label="Payload"
              render={(field) => (
                <Textarea placeholder={'{\n  "title": ""\n}'} {...field} />
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
