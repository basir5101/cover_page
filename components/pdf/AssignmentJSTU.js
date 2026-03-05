import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

// 1. Register the new font
Font.register({
  family: "OldEnglish",
  src: "/fonts/ManufacturingConsent-Regular.ttf", // Ensure this path is correct
});

// Font.register({
//   family: "Roboto-Regular",
//   fonts: [{ src: "/fonts/Roboto-Regular.ttf" }],
// });

export default function AssignmentJSTU({ data }) {
  const {
    assignment_topic = "Assignment Topic",
    course_title = "Course Title",
    course_code = "Course Code",
    student_name = "Student Name",
    student_id = "Student IDs",
    student_year = "Student Year",
    student_semester = "Student Semester",
    student_session = "Student Session",
    student_department = "Student Department",
    teacher_name = "Teacher Name",
    teacher_position = "Teacher Position",
    teacher_department = "Teacher Department",
    teacher_university = "Teacher University",
    submission_date = "Submission Date",
    topic_position = "center",
    student_faculty = "Student Faculty",
  } = data;

  // Load any fonts if needed
  Font.register({
    family: "Roboto-Regular",
    fonts: [{ src: "/fonts/Roboto-Regular.ttf" }],
  });

  // Create styles
  const styles = StyleSheet.create({
    container: {
      fontFamily: "Roboto-Regular",
      // margin: 50
    },

    facultyText: {
      fontFamily: "OldEnglish",
      fontSize: 18, // Adjusted to match the visual prominence in your image
      textAlign: "center",
      marginTop: 5,
      marginBottom: 5,
    },

    heading: {
      textAlign: "center",
      color: "#2d7136",
      fontSize: 15,
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    logo: {
      height: 120,
    },
    subTitle: {
      textAlign: "center",
      color: "#2d7136",
      fontSize: 12,
      marginTop: 8,
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      marginTop: 10,
    },
    assignmentTitle: {
      textAlign: "center",
      fontSize: 14,
      marginTop: 5,
    },
    courseDetails: {
      marginTop: 20,
      marginBottom: 20,
      textAlign: "center",
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      marginBottom: 20, // Add some margin to the table
    },
    tableRow: {
      flexDirection: "row", // Adjust the flexDirection for table rows
    },
    tableCol: {
      flex: 1,
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 4,
    },
    text: {
      fontSize: 12,
      marginTop: 4,
      whiteSpace: "nowrap",
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.container}>
        <View
          style={{
            border: "2px solid #898989",
            minHeight: "87%",
            padding: 30,
            margin: 50,
          }}
        >
          <View>
            <Text style={styles.heading}>
              JAMALPUR SCIENCE AND TECHNOLOGY UNIVERSITY
            </Text>
          </View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              src="/images/logo/jstu.png"
              alt="jstu logo"
            />
          </View>
          <Text style={styles.subTitle}>JAMALPUR-2012</Text>
          <View style={styles.hr} />
          <Text style={[styles.assignmentTitle, { fontFamily: "Times-Bold" }]}>
            Assignment on
          </Text>
          <Text
            style={[
              styles.assignmentTitle,
              { textAlign: topic_position === "center" ? "center" : "left" },
            ]}
          >
            {" "}
            {assignment_topic}{" "}
          </Text>
          <View style={styles.courseDetails}>
            <Text style={styles.text}>
              <Text style={{ fontFamily: "Times-Bold" }}>Course Title:</Text>{" "}
              {course_title}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontFamily: "Times-Bold" }}>Course Code:</Text>{" "}
              {course_code}
            </Text>
          </View>
          <View style={styles.table}>
            <View
              style={[
                styles.tableRow,
                {
                  backgroundColor: "#2d7136",
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "Times-Bold",
                },
              ]}
            >
              <Text style={[styles.tableCol, { fontSize: 15 }]}>
                Submitted By:
              </Text>
              <Text style={[styles.tableCol, { fontSize: 15 }]}>
                Submitted To:
              </Text>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.text, { fontFamily: "Times-Bold" }]}>
                  {student_name}
                </Text>
                <Text style={styles.text}>
                  <Text>Student Id:</Text> {student_id}
                </Text>
                <Text style={styles.text}>
                  {student_year} Year {student_semester} Semester
                </Text>
                <Text style={styles.text}>
                  Department of {student_department}
                </Text>
                <Text style={{ fontSize: 11, marginTop: 5 }}>
                  Jamalpur Science & Technology University
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={[styles.text, { fontFamily: "Times-Bold" }]}>
                  {teacher_name}
                </Text>
                <Text style={[styles.text, { marginTop: 3 }]}>
                  {teacher_position}{" "}
                </Text>
                <Text style={[styles.text, { marginTop: 23 }]}>
                  Department of {teacher_department}{" "}
                </Text>
                <Text style={[{ marginTop: 5, fontSize: 11 }]}>
                  {teacher_university}{" "}
                </Text>
              </View>
            </View>
          </View>
          <Text style={[styles.text, { marginTop: 40, textAlign: "center" }]}>
            Date: {submission_date}
          </Text>
          {/* // hr  */}
          <View style={styles.hr} />
          <View style={{ textAlign: "center", marginTop: 20 }}>
            <Text style={[styles.text, { fontFamily: "Times-Bold" }]}>
              Department of {student_department}
            </Text>
            <Text style={[styles.facultyText]}>
              Faculty of {student_faculty}
            </Text>
            <Text style={[styles.text, { fontFamily: "Times-Bold" }]}>
              Jamalpur Science & Technology University
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
