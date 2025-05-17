import { z } from 'zod';

export const schemaDiscord = z.object({
  webhook: z
    .string()
    .url('Command must be a valid URL')
    .refine(
      (url) =>
        /^https:\/\/(discord\.com|discordapp\.com)\/api\/webhooks\/\d+\/[\w-]+$/.test(
          url
        ),
      {
        message: 'Webhook must be a valid Discord webhook URL',
      }
    ),
});

export type DiscordValues = z.infer<typeof schemaDiscord>;
