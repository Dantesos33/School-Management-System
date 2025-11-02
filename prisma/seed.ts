import { Day, PrismaClient, UserGender } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // --- ADMIN ---
  await prisma.admin.upsert({
    where: { id: "admin1" },
    update: {},
    create: { id: "admin1", username: "admin1" },
  });
  await prisma.admin.upsert({
    where: { id: "admin2" },
    update: {},
    create: { id: "admin2", username: "admin2" },
  });

  // --- GRADE ---
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.upsert({
      where: { level: i },
      update: {},
      create: { level: i },
    });
  }

  // --- SUBJECT ---
  const subjectData = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Art",
  ];

  for (const name of subjectData) {
    await prisma.subject.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // --- TEACHER ---
  const teacherIds: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const teacher = await prisma.teacher.upsert({
      where: { id: `teacher${i}` },
      update: {},
      create: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        gender: i % 2 === 0 ? UserGender.MALE : UserGender.FEMALE,
        bloodType: "O+",
        phone: `123-456-78${String(i).padStart(2, "0")}`,
        address: `Address${i}`,
        createdAt: new Date(),
      },
    });
    teacherIds.push(teacher.id);
  }

  // --- CLASS ---
  for (let i = 1; i <= 6; i++) {
    await prisma.class.upsert({
      where: { name: `${i}A` },
      update: {},
      create: {
        name: `${i}A`,
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
        gradeId: i,
        supervisorId: teacherIds[i - 1], // assign teacher as supervisor
      },
    });
  }

  // --- PARENT ---
  for (let i = 1; i <= 25; i++) {
    const email = `parent${i}@example.com`; // unique email
    await prisma.parent.upsert({
      where: { email }, // use email for uniqueness
      update: {}, // nothing to update if exists
      create: {
        id: `parent${i}`,
        username: `parent${i}`,
        name: `PName${i}`,
        surname: `PSurname${i}`,
        email,
        phone: `987-654-78${String(i).padStart(2, "0")}`,
        address: `Address${i}`,
        gender: i % 2 === 0 ? UserGender.MALE : UserGender.FEMALE,
      },
    });
  }

  // --- STUDENT ---
  for (let i = 1; i <= 50; i++) {
    await prisma.student.upsert({
      where: { id: `student${i}` },
      update: {},
      create: {
        id: `student${i}`,
        username: `student${i}`,
        name: `SName${i}`,
        surname: `SSurname${i}`,
        email: `student${i}@example.com`,
        phone: `555-123-45${String(i).padStart(2, "0")}`,
        address: `Address${i}`,
        gender: i % 2 === 0 ? UserGender.MALE : UserGender.FEMALE,
        bloodType: "O+",
        parentId: `parent${((i - 1) % 25) + 1}`, // ensures valid parentId
        gradeId: ((i - 1) % 6) + 1,
        classId: ((i - 1) % 6) + 1,
        createdAt: new Date(),
      },
    });
  }

  // --- LESSON ---
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.create({
      data: {
        name: `Lesson${i}`,
        day: Day[Object.keys(Day)[i % 5] as keyof typeof Day],
        startTime: new Date(new Date().setHours(8 + (i % 5))),
        endTime: new Date(new Date().setHours(9 + (i % 5))),
        subjectId: ((i - 1) % 10) + 1,
        classId: ((i - 1) % 6) + 1,
        teacherId: teacherIds[(i - 1) % teacherIds.length],
      },
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
