import React, { useEffect, useState } from "react";
import Assignment from "@/components/pdf/Assignment";
import SEO from "@/components/SEO/SEO";
import Layout from "@/components/layout/CommonLayout";
import FormGenerator from "@/components/common/FormGenerator";
import { AssignmentProvider } from "@/components/context/AssignmentContext";

export default function Assignment1() {
  const fields = [
    "assignment_topic",
    "course_title",
    "course_code",
    // 'student_name',
    "student_id",
    "student_year",
    "student_semester",
    "student_session",
    "student_department",
    "teacher_name",
    "teacher_position",
    "teacher_department",
    "teacher_university",
    "submission_date",
  ];
  return (
    <Layout>
      <SEO
        title="Generate Assignment Cover Page for BSMRSTU</h1>"
        description="Generate Assignment Cover Page for BSMRSTU. Create a new assignment cover page for BSMRSTU and configure the new assignment cover page for BSMRSTU"
      />
      <AssignmentProvider
        university="Bangabandhu Sheikh Mujibur Rahman Science and Technology University, Gopalganj - 8100"
        logo={"/images/logo/bsmrstu.jpg"}
      >
        <FormGenerator
          fields={fields}
          title="Generate Assignment Cover Page for BSMRSTU"
          Design={Assignment}
          university="Bangabandhu Sheikh Mujibur Rahman Science and Technology University, Gopalganj - 8100"
        />
      </AssignmentProvider>
    </Layout>
  );
}
