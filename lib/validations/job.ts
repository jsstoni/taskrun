import { z } from 'zod';

const cronValueRegex =
  /^(\*|\d+|\d+-\d+|\*\/\d+|\d+(,\d+)*|\d+-\d+\/\d+)(,\d+)*$/;

export const schemaJobs = z.object({
  name: z.string().min(1, 'Name is required'),
  quickSchedule: z
    .array(
      z
        .string()
        .min(1, 'Required')
        .refine((val) => cronValueRegex.test(val), {
          message: 'Invalid cron value',
        })
    )
    .length(5, 'Must have 5 values'),
  command: z.string().url('Command must be a valid URL'),
  method: z.enum(['POST', 'PUT', 'DELETE']),
  metaData: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch {
          return val;
        }
      }
      return val;
    },
    z
      .any()
      .refine(
        (val) => typeof val === 'object' && val !== null && !Array.isArray(val),
        {
          message: 'Payload must be a valid JSON object',
        }
      )
  ),
});

export type JobValues = z.infer<typeof schemaJobs>;

export const idJob = z.object({
  id: z.string().uuid('ID must be a valid UUID'),
});
