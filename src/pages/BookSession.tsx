import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { createBooking } from "@/services/bookings";
import { signOutUser, clearAuth } from "@/services/auth";
import { getName } from "@/lib/auth";
import { FaCalendarAlt, FaClock, FaUser, FaSearch, FaArrowLeft } from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";

interface Counselor {
  id: string;
  name: string;
  role: string;
  specialization?: string;
  availability?: string;
}

export const BookSession = () => {
  const navigate = useNavigate();
  const name = getName();
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [filteredCounselors, setFilteredCounselors] = useState<Counselor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        // Simulate loading counselors (replace with actual API call)
        const mockCounselors: Counselor[] = [
          {
            id: "counselor1",
            name: "Dr. Sarah Johnson",
            role: "counselor",
            specialization: "Anxiety & Stress Management",
            availability: "Mon-Fri, 9AM-5PM"
          },
          {
            id: "counselor2",
            name: "Dr. Michael Chen",
            role: "counselor",
            specialization: "Academic Performance",
            availability: "Tue-Thu, 10AM-6PM"
          },
          {
            id: "counselor3",
            name: "Ms. Emily Davis",
            role: "on-campus-counselor",
            specialization: "Peer Relationships",
            availability: "Mon-Wed-Fri, 1PM-4PM"
          }
        ];

        setCounselors(mockCounselors);
        setFilteredCounselors(mockCounselors);

      } catch (error) {
        console.error('Failed to load counselors:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load counselors. Please try again."
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCounselors(counselors);
    } else {
      const filtered = counselors.filter(counselor =>
        counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        counselor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        counselor.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCounselors(filtered);
    }
  }, [searchTerm, counselors]);

  const handleBookSession = async (counselorId: string, counselorName: string) => {
    setBookingLoading(counselorId);
    try {
      console.log('Booking session with:', counselorId, counselorName);

      // Simulate API call (replace with actual createBooking call)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Actual implementation would be:
      // const bookingId = await createBooking(counselorId);

      toast({
        title: "Booking Request Sent",
        description: `Your session request has been sent to ${counselorName}. They will contact you to confirm the time.`
      });

      // Navigate back to dashboard after successful booking
      setTimeout(() => navigate('/student-dashboard'), 1500);

    } catch (error) {
      console.error('Booking failed:', error);
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: "Failed to book session. Please try again."
      });
    } finally {
      setBookingLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/95 backdrop-blur-md border-b shadow-lg">
        <div className="container h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/student-dashboard')}
              className="flex items-center gap-2"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Book a Session
              </h1>
              <p className="text-sm text-gray-600">Hello, {name}</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={async () => { await signOutUser(); clearAuth(); navigate('/'); }}
            className="border-gray-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <FaCalendarAlt className="w-6 h-6 text-white" />
              </div>
              Available Counselors
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Choose a counselor to book a session. They will contact you to confirm the timing.
            </p>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search counselors by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-6 text-lg border-2 border-gray-200 focus:border-blue-500"
              />
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading available counselors...</p>
              </div>
            )}

            {!loading && filteredCounselors.length === 0 && (
              <div className="text-center py-12">
                <GiMeditation className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">No counselors found</p>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCounselors.map((counselor) => (
                <Card key={counselor.id} className="border-2 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                        <FaUser className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{counselor.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">
                          {counselor.role.replace('-', ' ')}
                        </p>
                      </div>
                    </div>

                    {counselor.specialization && (
                      <div className="mb-4">
                        <Label className="text-sm font-medium text-gray-700">Specialization</Label>
                        <p className="text-sm text-gray-600">{counselor.specialization}</p>
                      </div>
                    )}

                    {counselor.availability && (
                      <div className="mb-4">
                        <Label className="text-sm font-medium text-gray-700">Availability</Label>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <FaClock className="w-3 h-3" />
                          {counselor.availability}
                        </p>
                      </div>
                    )}

                    <Button
                      onClick={() => handleBookSession(counselor.id, counselor.name)}
                      disabled={bookingLoading === counselor.id}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {bookingLoading === counselor.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Booking...
                        </>
                      ) : (
                        'Book Session'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="mt-8 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">How it works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Book a Session</h4>
                <p className="text-sm text-gray-600">Choose a counselor and send a booking request</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Get Confirmation</h4>
                <p className="text-sm text-gray-600">Counselor will confirm the session time</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Attend Session</h4>
                <p className="text-sm text-gray-600">Join the session at the scheduled time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};