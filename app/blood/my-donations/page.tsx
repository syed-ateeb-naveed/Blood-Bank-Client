import { getDonations } from "@/app/actions"
import { Card, CardContent } from "@/components/ui/card"
import { Droplet, Calendar, Clock, MapPin, Activity, Hash } from "lucide-react"

// Add this line to force dynamic rendering
export const dynamic = "force-dynamic"

export default async function MyDonationsPage() {
  const donations = await getDonations()

  return (
    <div className="container mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold text-white mb-8">My Donations</h1>
      <div className="space-y-6">
        {donations.length === 0 ? (
          <Card className="glass-card bg-white">
            <CardContent className="p-8 text-center text-black">
              <p>You haven't made any donations yet.</p>
            </CardContent>
          </Card>
        ) : (
          donations.map((donation: any) => (
            <Card key={donation.id} className="glass-card bg-white/20 hover:bg-white/30 transition-colors">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="p-3 bg-red-500/20 rounded-full">
                      <Hash className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Donation ID</p>
                      <p className="text-lg font-semibold">{donation.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-white">
                    <div className="p-3 bg-red-500/20 rounded-full">
                      <Droplet className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Units Donated</p>
                      <p className="text-lg font-semibold">{donation.units} units</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-white">
                    <div className="p-3 bg-red-500/20 rounded-full">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Date</p>
                      <p className="text-lg font-semibold">{new Date(donation.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-white">
                    <div className="p-3 bg-red-500/20 rounded-full">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Time</p>
                      <p className="text-lg font-semibold">{donation.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-white">
                    <div className="p-3 bg-red-500/20 rounded-full">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Location</p>
                      <p className="text-lg font-semibold">{donation.location}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="p-3 bg-red-500/20 rounded-full">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Status</p>
                      <p className="text-lg font-semibold">
                        {new Date(donation.date) > new Date() ? "Due" : "Completed"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

