import MatchDetailClient from '@/components/bola/MatchDetailClient'
import { getMatchDetail, getMatchStats } from '@/libs/bola/api'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function MatchDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const fixtureId = Number(id)

  if (!fixtureId || Number.isNaN(fixtureId)) notFound()

  const [detail, stats] = await Promise.all([
    getMatchDetail(fixtureId),
    getMatchStats(fixtureId),
  ])

  if (!detail?.response?.length) notFound()

  return (
    <MatchDetailClient
      match={detail.response[0]}
      stats={stats?.response || []}
    />
  )
}