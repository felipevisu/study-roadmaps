import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const roadmaps = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/roadmaps' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    accent: z.string(),
    order: z.number(),
    source: z.string().optional(),
  }),
})

const weeks = defineCollection({
  // ids come out as "<roadmap>/<file>", e.g. "aws/02-vpc-do-zero"
  loader: glob({ pattern: '**/*.md', base: './src/content/weeks' }),
  schema: z.object({
    roadmap: z.string(),
    week: z.number(),
    title: z.string(),
    phase: z.string().optional(),
    status: z.enum(['todo', 'doing', 'done', 'skipped']).default('todo'),
    pocs: z
      .array(z.object({ label: z.string(), url: z.string().optional() }))
      .default([]),
    // set this when you finish a week; shows up on the roadmap timeline
    done_at: z.coerce.date().optional(),
  }),
})

export const collections = { roadmaps, weeks }
