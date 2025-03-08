import { DonationList } from "@/components/donation-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DonationsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Donations</h1>
        <Button asChild>
          <Link href="/blood/donations/new">New Donation</Link>
        </Button>
      </div>
      <DonationList />
    </div>
  )
}

