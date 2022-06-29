import React, { createContext, useState, FC, useEffect, useContext } from 'react'
import { init as initIubenda } from '@crowdhouse/iubenda'

export type GdprContextState = {
  useGdpr: () => {
    isAccepted: boolean
  }
}

/* istanbul ignore next */
const contextDefaultValues: GdprContextState = {
  useGdpr: (() => {}) as any,
}

export const GdprContext = createContext<GdprContextState>(contextDefaultValues)

interface GdprProviderProps {
  initialState?: {
    isAccepted: boolean
    isPending: boolean
  }
}

export const useGdpr = () => {
  const { useGdpr } = useContext(GdprContext)
  return useGdpr()
}

export const GdprProvider: FC<GdprProviderProps> = ({ initialState = {}, children }) => {
  const [isPending, setIsPending] = useState<boolean>('isPending' in initialState ? initialState.isPending : true)
  const [isAccepted, setIsAccepted] = useState<boolean>('isAccepted' in initialState ? initialState.isAccepted : false)
  const [isQueried, setIsQueried] = useState<boolean>(false)

  const useGdpr = () => {
    useEffect(() => {
      if (!isQueried) {
        initIubenda({
          callback: {
            onConsentGiven: () => {
              setIsAccepted(true)
              setIsPending(false)
            },
            onConsentRejected: () => {
              setIsPending(false)
            },
          },
        })
        setIsQueried(true)
      }
    }, [])

    return { isAccepted: isAccepted && !isPending }
  }

  return (
    <GdprContext.Provider
      value={{
        useGdpr,
      }}
    >
      {children}
    </GdprContext.Provider>
  )
}
