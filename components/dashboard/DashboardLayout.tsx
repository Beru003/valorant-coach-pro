import type { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return <div className="container mx-auto px-4 py-8 space-y-8">{children}</div>
}
