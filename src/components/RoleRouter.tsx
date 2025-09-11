import { Navigate } from "react-router-dom";
import { getRole } from "@/lib/auth";
import { StudentDashboard } from "@/components/dashboards/StudentDashboard";
import { CounselorDashboard } from "@/components/dashboards/CounselorDashboard";
import { OnCampusCounselorDashboard } from "@/components/dashboards/OnCampusCounselorDashboard";

export const RoleRouter = () => {
  const role = getRole();
  if (!role) return <Navigate to="/login" replace />;
  switch (role) {
    case 'student':
      return <StudentDashboard />;
    case 'counselor':
      return <CounselorDashboard />;
    case 'on-campus-counselor':
      return <OnCampusCounselorDashboard />;
    default:
      return <StudentDashboard />;
  }
};


