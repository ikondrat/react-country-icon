import { FC, useEffect } from 'react'
import { useGdpr } from '../GdprContext'

export const InitAnalytics: FC<{ analyticsKey: string }> = ({ analyticsKey }) => {
  const { isAccepted } = useGdpr()

  useEffect(() => {
    if (isAccepted) {
      analytics.load(analyticsKey)
    }
  }, [isAccepted])

  return null
}
