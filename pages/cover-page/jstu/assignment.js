import FormGenerator from "@/components/common/FormGenerator";
import { AssignmentProvider } from "@/components/context/AssignmentContext";
import Layout from "@/components/layout/CommonLayout";
import AssignmentJSTU from "@/components/pdf/AssignmentJSTU";
import SEO from "@/components/SEO/SEO";

export default function Assignment1() {
  const fields = [
    "assignment_topic",
    "course_title",
    "course_code",
    "student_name",
    "student_id",
    "student_year",
    "student_semester",
    "student_department",
    "student_faculty",
    "teacher_name",
    "teacher_position",
    "teacher_department",
    "teacher_university",
    "submission_date",
  ];
  return (
    <Layout>
      <SEO
        title="Generate Assignment Cover Page for JSTU</h1>"
        description="Generate Assignment Cover Page for JSTU. Create a new assignment cover page for JSTU and configure the new assignment cover page for JSTU"
      />
      <AssignmentProvider
        university="Jamalpur Science & Technology University"
        logo={"/images/logo/jstu.png"}
      >
        <FormGenerator
          fields={fields}
          title="Generate Assignment Cover Page for JSTU"
          Design={AssignmentJSTU}
          university="Jamalpur Science & Technology University"
        />
      </AssignmentProvider>
    </Layout>
  );
}
