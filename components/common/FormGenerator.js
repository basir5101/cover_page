import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import Image from "next/image";
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
import { motion } from "framer-motion";
import { useAssignmentContext } from "../context/AssignmentContext";

export default function FormGenerator({
  fields = [],
  title = "assignment cover page",
  Design,
}) {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(true);
  const [assignmentData, setAssignmentData] = useState({});
  const [topic_position, setTopicPosition] = useState("center");
  const [client, setClient] = useState(false);
  // const [universityName, setUniversityName] = useState(university)
  const { universityName, universityLogo, handleName, handleLogo } =
    useAssignmentContext();

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
    setAssignmentData({
      ...data,
      submission_date: formattedDate,
      topic_position,
    });
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
  const handleFileChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    const url = URL.createObjectURL(selectedFile);
    handleLogo(url);
  };
  return (
    <section className="container py-5">
      <h1 className="my-4 text-primary" style={{ fontSize: "2.3 rem" }}>
        {" "}
        {title}{" "}
      </h1>
      <div className="mb-3 border border-danger px-2 border-round text-center d-inline-block">
        <span className="fw-bold">Note: </span> Please use chrome browser for
        best experience.
      </div>
      <div className="d-flex mb-3 justify-content center align-items-end">
        <Image
          src={universityLogo}
          alt={universityName}
          height={280}
          width={240}
          style={{
            height: "280px",
            width: "auto",
          }}
        />
        <div
          style={{
            position: "relative",
            overflow: "hidden",
          }}
          className="file btn btn-secondary ms-1"
        >
          Change Logo
          <input
            onChange={handleFileChange}
            accept="image/*"
            style={{
              position: "absolute",
              opacity: 0,
              right: 0,
              top: 0,
            }}
            type="file"
            name="file"
          />
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <motion.label
          initial={{ x: 150, opacity: 0.1 }}
          whileInView={{ x: 0, opacity: 1 }}
          htmlFor="title"
        >
          University Name:{" "}
        </motion.label>
        <motion.input
          initial={{ x: 150, opacity: 0.1 }}
          whileInView={{ x: 0, opacity: 1 }}
          defaultValue={universityName}
          onChange={(e) => handleName(e.target.value)}
          className="form-control"
        />
      </div>

      {!loading && editing && client && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {fields.map((field) => (
              <div className="col-md-4 mb-3" key={field}>
                <motion.label
                  initial={{ x: 150, opacity: 0.1 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  htmlFor={field}
                >
                  {field
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </motion.label>
                {field === "student_semester" ? (
                  <motion.select
                    initial={{ x: 150, opacity: 0.1 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    defaultValue={assignmentData[field]}
                    className="form-select"
                    {...register(field)}
                  >
                    <option value="">Select Semester</option>
                    {["1st", "2nd", "3rd"].map((item) => (
                      <option key={item} value={item}>
                        {" "}
                        {item}{" "}
                      </option>
                    ))}
                  </motion.select>
                ) : field === "student_year" ? (
                  <motion.select
                    initial={{ x: 150, opacity: 0.1 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    defaultValue={assignmentData[field]}
                    className="form-select"
                    {...register(field)}
                  >
                    <option value="">Select Year</option>
                    {["1st", "2nd", "3rd", "4th"].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </motion.select>
                ) : field === "student_session" ? (
                  <motion.select
                    initial={{ x: 150, opacity: 0.1 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    defaultValue={assignmentData[field]}
                    className="form-select"
                    {...register(field)}
                  >
                    <option value="">Select Session</option>
                    {sessions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </motion.select>
                ) : field === "teacher_position" ? (
                  <motion.select
                    initial={{ x: 150, opacity: 0.1 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    defaultValue={assignmentData[field]}
                    className="form-select"
                    {...register(field)}
                  >
                    <option value="">Select Teacher Position</option>
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
                  </motion.select>
                ) : field === "teacher_university" ? (
                  <motion.input
                    initial={{ x: 150, opacity: 0.1 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    defaultValue={universityName}
                    placeholder={field}
                    className="form-control"
                    {...register(`${field}`, { required: true })}
                  />
                ) : field === "submission_date" ? (
                  <motion.input
                    initial={{ x: 150, opacity: 0.1 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    defaultValue={assignmentData[field]}
                    type="date"
                    className="form-control"
                    {...register(`${field}`, { required: true })}
                  />
                ) : field === "assignment_topic" ? (
                  <div className="position-relative">
                    <select
                      style={{ width: "100px" }}
                      className="form-select position-absolute top-0 end-0"
                      aria-label="Default select example"
                      defaultValue={topic_position}
                      onChange={(e) => setTopicPosition(e.target.value)}
                    >
                      <option value={"center"}>center</option>
                      <option value="left">left</option>
                    </select>
                    <motion.textarea
                      initial={{ x: 150, opacity: 0.1 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      defaultValue={assignmentData[field]}
                      className="form-control"
                      {...register(`${field}`, { required: true })}
                    />
                  </div>
                ) : (
                  <motion.input
                    initial={{ x: 150, opacity: 0.1 }}
                    whileInView={{ x: 0, opacity: 1 }}
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
            className="btn btn-success mt-3 px-5 bounce-btn"
            type="submit"
            value={"Generate"}
          />
        </form>
      )}

      {!editing && (
        <>
          <div className="text-center">
            <Image
              height={500}
              width={500}
              src={"/images/done.svg"}
              alt={title}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <PDFDownloadLink
              className="bounce-btn"
              style={{
                color: "#fff",
                borderRadius: "5px",
                backgroundColor: "#28a745",
                padding: "7px 25px",
                textDecoration: "none",
              }}
              document={
                <Design
                  data={assignmentData}
                  name={universityName}
                  logo={universityLogo}
                />
              }
              fileName={`${assignmentData?.student_id || "cover"} ${
                new Date().toLocaleTimeString() || "cover"
              }.pdf`}
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
          </div>
          <div style={styles.pdfContainer}>
            <PDFViewer style={styles.pdfViewer}>
              <Design
                data={assignmentData}
                name={universityName}
                logo={universityLogo}
              />
            </PDFViewer>
          </div>
        </>
      )}
    </section>
  );
}
