import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, GraduationCap, Building2, User, Phone, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { setRole, setName } from "@/lib/auth";
import { signUpEmail } from "@/services/auth";

const SignUp = () => {
  const navigate = useNavigate();
  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Student fields
  const [studentPhone, setStudentPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [guardian, setGuardian] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [course, setCourse] = useState("");

  // Counselor fields
  const [cName, setCName] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cInfo, setCInfo] = useState("");

  // On-campus counselor fields
  const [ocName, setOcName] = useState("");
  const [ocPhone, setOcPhone] = useState("");
  const [ocInstitution, setOcInstitution] = useState("");

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-accent-soft via-secondary-soft to-primary-soft flex items-center justify-center p-4 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="w-full max-w-2xl relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4 shadow-large">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Create your account</h1>
          <p className="text-muted-foreground mt-2">Choose your role to get a tailored experience</p>
        </div>
        <div className="rounded-2xl p-px bg-gradient-to-r from-primary/60 via-secondary/60 to-accent/60 shadow-large">
        <Card className="border-0 shadow-none bg-background/70 backdrop-blur rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>Select role and fill required details</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Student
                </TabsTrigger>
                <TabsTrigger value="counselor" className="flex items-center gap-2">
                  <User className="w-4 h-4" /> Counselor
                </TabsTrigger>
                <TabsTrigger value="on-campus" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> On-Campus
                </TabsTrigger>
              </TabsList>

              {/* Student */}
              <TabsContent value="student" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sEmail">Email</Label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="sEmail" type="email" placeholder="you@university.edu" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sPassword">Create Password</Label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="sPassword" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sPhone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="sPhone" type="tel" placeholder="+91 98765 43210" value={studentPhone} onChange={(e) => setStudentPhone(e.target.value)} className="h-11 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="institution" placeholder="University / College" value={institution} onChange={(e) => setInstitution(e.target.value)} className="h-11 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardian">Guardian Name</Label>
                    <Input id="guardian" placeholder="Parent/Guardian full name" value={guardian} onChange={(e) => setGuardian(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gPhone">Guardian Phone</Label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="gPhone" type="tel" placeholder="+91 98765 43210" value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} className="h-11 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="hobbies">Hobbies / Interests</Label>
                    <Input id="hobbies" placeholder="Reading, music, sports..." value={hobbies} onChange={(e) => setHobbies(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="course">Currently Pursuing</Label>
                    <Input id="course" placeholder="B.Tech CSE / MBA / BA Psych..." value={course} onChange={(e) => setCourse(e.target.value)} className="h-11" />
                  </div>
                </div>
                <Button className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-large" onClick={async () => { try { const u = await signUpEmail(email, password, 'student', undefined, studentPhone); setName(u.name); setRole(u.role); navigate('/dashboard'); } catch { alert('Sign up failed'); } }}>
                  Create Student Account <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </TabsContent>

              {/* Counselor */}
              <TabsContent value="counselor" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cName">Full Name</Label>
                    <Input id="cName" placeholder="Your full name" value={cName} onChange={(e) => setCName(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cEmail">Email</Label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="cEmail" type="email" placeholder="you@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cPhone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="cPhone" type="tel" placeholder="+91 98765 43210" value={cPhone} onChange={(e) => setCPhone(e.target.value)} className="h-11 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cInfo">Brief Information</Label>
                    <Input id="cInfo" placeholder="Experience, specialization, certifications..." value={cInfo} onChange={(e) => setCInfo(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cPassword">Create Password</Label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="cPassword" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 pl-10" />
                    </div>
                  </div>
                </div>
                <Button className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-large" onClick={async () => { 
                  if (!cPhone.trim()) { alert('Please enter your phone number'); return; }
                  try { const u = await signUpEmail(email, password, 'counselor', cName, cPhone); setName(u.name); setRole(u.role); navigate('/dashboard'); } catch { alert('Sign up failed'); } 
                }}>
                  Create Counselor Account <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </TabsContent>

              {/* On-campus Counselor */}
              <TabsContent value="on-campus" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ocName">Full Name</Label>
                    <Input id="ocName" placeholder="Your full name" value={ocName} onChange={(e) => setOcName(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ocEmail">Email</Label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="ocEmail" type="email" placeholder="you@institution.edu" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ocPhone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="ocPhone" type="tel" placeholder="+91 98765 43210" value={ocPhone} onChange={(e) => setOcPhone(e.target.value)} className="h-11 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ocInstitution">Institution</Label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="ocInstitution" placeholder="University / College" value={ocInstitution} onChange={(e) => setOcInstitution(e.target.value)} className="h-11 pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="ocPassword">Create Password</Label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="ocPassword" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 pl-10" />
                    </div>
                  </div>
                </div>
                <Button className="w-full h-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-large" onClick={async () => { 
                  if (!ocPhone.trim()) { alert('Please enter your phone number'); return; }
                  try { const u = await signUpEmail(email, password, 'on-campus-counselor', ocName, ocPhone); setName(u.name); setRole(u.role); navigate('/dashboard'); } catch { alert('Sign up failed'); } 
                }}>
                  Create On-Campus Account <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Already have an account? <Link to="/login" className="text-primary font-medium">Log in</Link>
              </p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


