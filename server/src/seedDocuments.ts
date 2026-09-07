import "dotenv/config";
import { addDocument } from "./services/documentService";

const documents = [
  {
    title: "Enrollment",
    content:
      "New student enrollment opens every year in April and closes at the end of June. Parents must submit a completed application form, a copy of the child's birth certificate, and proof of address. Enrollment is confirmed only after payment of the registration fee.",
  },
  {
    title: "Tuition Fees",
    content:
      "Annual tuition fees are due in three installments: September, January, and April. A 5 percent discount is offered for full payment made before August 15. Families with more than one child enrolled receive a 10 percent discount on the second child's tuition.",
  },
  {
    title: "School Hours",
    content:
      "Classes run from Sunday to Thursday, 08:00 to 14:30. An after-school program is available until 16:30 for an additional fee. The school office is open from 07:30 to 15:30 for administrative matters.",
  },
  {
    title: "Attendance Policy",
    content:
      "Students are expected to attend school every day unless ill. Parents must notify the school office before 08:30 in case of absence. After three consecutive unexplained absences, the homeroom teacher will contact the family directly.",
  },
  {
    title: "Grading System",
    content:
      "Students are graded on a scale from 0 to 100 in each subject. Report cards are issued at the end of each semester. A grade below 60 is considered failing and may require additional tutoring sessions.",
  },
  {
    title: "Homework Policy",
    content:
      "Homework is assigned daily for core subjects such as math and language. Elementary students should spend no more than 45 minutes per day on homework, while middle school students may spend up to 90 minutes. Homework is reviewed the following school day.",
  },
  {
    title: "Uniform Policy",
    content:
      "All students are required to wear the official school uniform during school hours. The uniform consists of a navy polo shirt with the school logo and grey pants or skirt. Sports uniforms are required only on physical education days.",
  },
  {
    title: "Extracurricular Activities",
    content:
      "The school offers extracurricular activities including chess club, robotics, choir, and basketball. Activities take place after school hours, twice a week, and require a separate registration form. Some activities may have an additional participation fee.",
  },
  {
    title: "Parent-Teacher Meetings",
    content:
      "Parent-teacher meetings are held twice a year, once per semester. Additional meetings can be scheduled upon request by contacting the homeroom teacher directly. Meeting slots are typically 15 minutes long and must be booked in advance.",
  },
  {
    title: "Discipline Policy",
    content:
      "Students are expected to follow the school code of conduct at all times. Minor infractions result in a verbal warning from the teacher, while repeated or serious infractions are referred to the school principal. Parents are informed of any disciplinary action taken.",
  },
];

async function seed() {
  for (const doc of documents) {
    const result = await addDocument(doc.title, doc.content);
    console.log(`✅ Added: ${result.title} (id: ${result.document_id})`);
  }
  console.log("🌱 Seeding complete.");
}

seed();
