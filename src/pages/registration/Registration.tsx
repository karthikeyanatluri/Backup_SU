import { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { RegisterPage } from "../../RegisterPage";
import type { SchoolId } from "../../data/schoolsData";
import type { RegistrationSelection } from "../../data/registrationConfig";

export default function Registration({
  goToPage,
}: {
  goToPage: (path: string) => void;
  startAnimation?: boolean;
}) {
  const location = useLocation();

  const initialSelection = useMemo<Partial<RegistrationSelection>>(() => {
    const params = new URLSearchParams(location.search);
    const school = params.get("school") as SchoolId | null;
    const dept = params.get("dept");
    const event = params.get("event");
    return {
      schoolId: school || "engineering",
      deptId: dept || undefined,
      eventIds: event ? [event] : undefined,
    };
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>Registration | SUPRAGNA 2K27</title>
        <meta
          name="description"
          content="Official Registration for SUPRAGNA 2K27 National Techno-Cultural & Management Festival. Select your School, Department and Event to generate your sealed royal delegate pass."
        />
      </Helmet>
      <RegisterPage
        initialSelection={initialSelection}
        onBack={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            goToPage("/events");
          }
        }}
        onBackToSchools={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            goToPage("/events");
          }
        }}
      />
    </>
  );
}
