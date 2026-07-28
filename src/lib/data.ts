import { getCollection, type CollectionEntry } from 'astro:content'

export type Week = CollectionEntry<'weeks'>
export type Roadmap = CollectionEntry<'roadmaps'>

export const STATUS = {
  todo: { label: 'A fazer', className: 'todo' },
  doing: { label: 'Em andamento', className: 'doing' },
  done: { label: 'Concluída', className: 'done' },
  skipped: { label: 'Pulada', className: 'skipped' },
} as const

/** Weeks of one roadmap, ordered. */
export async function weeksOf(roadmapId: string): Promise<Week[]> {
  const all = await getCollection('weeks', (w) => w.data.roadmap === roadmapId)
  return all.sort((a, b) => a.data.week - b.data.week)
}

export async function allRoadmaps(): Promise<Roadmap[]> {
  const all = await getCollection('roadmaps')
  return all.sort((a, b) => a.data.order - b.data.order)
}

export function stats(weeks: Week[]) {
  const done = weeks.filter((w) => w.data.status === 'done').length
  const doing = weeks.filter((w) => w.data.status === 'doing').length
  const skipped = weeks.filter((w) => w.data.status === 'skipped').length
  const counted = weeks.length - skipped
  return {
    total: weeks.length,
    done,
    doing,
    skipped,
    pocs: weeks.reduce((n, w) => n + w.data.pocs.length, 0),
    // skipped weeks leave the denominator so the bar can still reach 100%
    percent: counted === 0 ? 0 : Math.round((done / counted) * 100),
  }
}

/** Week slug used in URLs: "aws/02-vpc-do-zero" -> "02-vpc-do-zero" */
export const weekSlug = (w: Week) => w.id.split('/').pop()!

/** Group weeks by phase, preserving order and allowing weeks with no phase. */
export function byPhase(weeks: Week[]) {
  const groups: { phase: string | null; weeks: Week[] }[] = []
  for (const w of weeks) {
    const phase = w.data.phase ?? null
    const last = groups.at(-1)
    if (last && last.phase === phase) last.weeks.push(w)
    else groups.push({ phase, weeks: [w] })
  }
  return groups
}
