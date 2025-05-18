'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { WrapperCard } from '@/components/wrapper-card';
import { addDiscord } from '@/lib/actions/add-discord';
import { DiscordValues, schemaDiscord } from '@/lib/validations/discord';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Link, Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

export function Discord() {
  const form = useForm<DiscordValues>({
    resolver: zodResolver(schemaDiscord),
    defaultValues: {
      webhook: '',
    },
  });

  const { executeAsync } = useAction(addDiscord, {
    onError: ({ error }) => {
      form.setError('root', { message: error.serverError });
    },
  });

  const onSubmit = async (data: DiscordValues) => {
    await executeAsync(data);
  };

  return (
    <WrapperCard
      title="Discord"
      description="Receive detailed alerts directly in Discord"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="webhook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Webhook URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="pl-8"
                      placeholder="https://discord.com/api/webhooks/<id>"
                      {...field}
                    />
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

          {form.formState.errors.root && (
            <p className="text-red-500">{form.formState.errors.root.message}</p>
          )}

          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Webhook Info</AlertTitle>
            <AlertDescription>
              Only one webhook allowed. Save a new one to replace it.
            </AlertDescription>
          </Alert>

          <Button
            className="self-start"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
            Save
          </Button>
        </form>
      </Form>
    </WrapperCard>
  );
}
