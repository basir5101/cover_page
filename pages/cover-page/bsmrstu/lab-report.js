import React, { useEffect, useState } from "react";
import Assignment from "@/components/pdf/Assignment";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import LabReport from "@/components/pdf/LabReport";
import Image from "next/image";
import SEO from "@/components/SEO/SEO";
import Layout from "@/components/layout/CommonLayout";
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false, // Disable server-side rendering for PDFViewer
  }
);
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false, // Disable server-side rendering for PDFViewer
  }
);

export default function LabCover() {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(true);
  const [assignmentData, setAssignmentData] = useState({});
  const [client, setClient] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ ...assignmentData });

  useEffect(() => {
    try {
      const assignment_data = localStorage.getItem("assignment_data");
      setAssignmentData(JSON.parse(assignment_data) || {});
      setClient(true);
    } catch (error) {
      setClient(true);
    }
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setEditing(false);
    const formattedDate = new Date(data.submission_date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
    setLoading(false);
    setAssignmentData({ ...data, submission_date: formattedDate });
    localStorage.setItem(
      "assignment_data",
      JSON.stringify({ ...data, submission_date: formattedDate })
    );
  };

  const currentYear = new Date().getFullYear();
  const years = [];
  const sessions = [];
  for (let i = 0; i < 10; i++) {
    const startYear = currentYear - i;
    const endYear = currentYear + 1 - i;
    years.push(startYear); // Push the startYear (e.g., 2014, 2015, 2016, etc.) to the years array
    sessions.push(`${startYear}-${String(endYear).slice(2)}`);
  }

  const fields = [
    "course_title",
    "course_code",
    "student_name",
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

  const styles = {
    pdfContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
    },
    pdfViewer: {
      width: "90%",
      height: "90%",
    },
  };
  return (
    <Layout>
      <section className="container py-5">
        <SEO
          title="Generate Lab report Cover Page for BSMRSTU</h1>"
          description="Generate Lab report Cover Page for BSMRSTU. Create a new Lab report cover page for BSMRSTU and configure the new Lab report cover page for BSMRSTU"
        />
        <h1 className="my-4 text-primary" style={{ fontSize: "2.3 rem" }}>
          Generate Lab Report Cover Page for BSMRSTU
        </h1>
        {loading && (
          <div className="d-flex align-items-center">
            <strong>Loading...</strong>
            <div
              className="spinner-border ms-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        )}
        {!loading && editing && client && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {fields.map((field) => (
                <div className="col-md-4 mb-3" key={field}>
                  <label htmlFor={field}>
                    {field
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </label>
                  {field === "student_semester" ? (
                    <select
                      defaultValue={assignmentData[field]}
                      className="form-select"
                      {...register(field)}
                    >
                      <option value="">Semester</option>
                      {[
                        "1st",
                        "2nd",
                        "3rd",
                        "4th",
                        "5th",
                        "6th",
                        "7th",
                        "8th",
                      ].map((item) => (
                        <option key={item} value={item}>
                          {" "}
                          {item}{" "}
                        </option>
                      ))}
                    </select>
                  ) : field === "student_year" ? (
                    <select
                      defaultValue={assignmentData[field]}
                      className="form-select"
                      {...register(field)}
                    >
                      <option value="">Year</option>
                      {["1st", "2nd", "3rd", "4th"].map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  ) : field === "student_session" ? (
                    <select
                      defaultValue={assignmentData[field]}
                      className="form-select"
                      {...register(field)}
                    >
                      <option value="">Session</option>
                      {sessions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  ) : field === "teacher_position" ? (
                    <select
                      defaultValue={assignmentData[field]}
                      className="form-select"
                      {...register(field)}
                    >
                      <option value="">Teacher Position</option>
                      {[
                        "Lecturer",
                        "Assistant Professor",
                        "Associate Professor",
                        "Professor",
                      ].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  ) : field === "teacher_university" ? (
                    <input
                      defaultValue={
                        "Gopalganj Science and Technology University Gopalganj - 8100"
                      }
                      className="form-control"
                      {...register(`${field}`, { required: true })}
                    />
                  ) : field === "submission_date" ? (
                    <input
                      defaultValue={assignmentData[field]}
                      type="date"
                      className="form-control"
                      {...register(`${field}`, { required: true })}
                    />
                  ) : (
                    <input
                      defaultValue={assignmentData[field]}
                      className="form-control"
                      {...register(`${field}`, { required: true })}
                    />
                  )}
                  {errors[field] && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
              ))}
            </div>
            <input
              className="btn btn-success mt-3 px-5"
              type="submit"
              value={"Generate"}
            />
          </form>
        )}

        {!editing && (
          <>
            <div className="text-center">
              <Image
                height={350}
                width={350}
                src={"/images/done.svg"}
                alt="assignment cover page generator for bsmrstu"
              />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <PDFDownloadLink
                style={{
                  color: "#fff",
                  borderRadius: "5px",
                  backgroundColor: "#28a745",
                  padding: "7px 25px",
                  textDecoration: "none",
                }}
                document={<LabReport data={assignmentData} />}
                fileName={`lab_report_${assignmentData?.course_code}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download PDF"
                }
              </PDFDownloadLink>
              <button
                className="btn btn-primary ms-2 px-5"
                onClick={() => setEditing(true)}
              >
                Edit Again
              </button>
              {/* <div style={styles.pdfContainer}>
                        <PDFViewer style={styles.pdfViewer}>
                            <LabReport data={assignmentData} />
                        </PDFViewer>
                    </div> */}
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}
