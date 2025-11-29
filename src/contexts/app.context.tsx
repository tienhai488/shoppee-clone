import React, {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  type ReactElement
} from 'react'
import type { ExtendedPurchase } from 'src/types/purchase.type'
import type { User } from 'src/types/user.type'
import { getAccessToken } from 'src/utils/auth'
import { getProfile } from 'src/utils/profile'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  profile: User | null
  setProfile: Dispatch<SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: Dispatch<SetStateAction<ExtendedPurchase[]>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessToken()),
  setIsAuthenticated: () => null,
  profile: getProfile(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export function AppProvider({ children }: { children: ReactNode }): ReactElement {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchases)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
