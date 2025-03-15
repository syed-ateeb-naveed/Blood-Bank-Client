import { NewDonationForm } from "@/components/new-donation-form"

export default function NewDonationPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="glass-card p-8">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">New Donation</h1>
        <NewDonationForm />
      </div>
    </div>
  )
}

