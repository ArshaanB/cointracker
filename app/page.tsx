import { Dashboard } from '@/components/dashboard'
import { MainTable } from '@/components/main-table'
import AddCoinComponent from '@/components/ui/addCoinComponent'

export default function Home() {
  return (
    <main>
      <Dashboard />
      <AddCoinComponent />
      <MainTable />
    </main>
  )
}
