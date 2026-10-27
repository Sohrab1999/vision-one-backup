// N1-1.e final status verification — READ-ONLY inspection (SELECT only).
// No create/update/delete/upsert/exec — retention decisions require zero mutation.
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({ log: [] });

async function main() {
  const out: Record<string, unknown> = {};

  // 1) QA class «QA N1-1-e» code 208444 — must be retained
  const qa = await db.classroom.findFirst({
    where: { code: "208444" },
    select: { id: true, name: true, code: true, createdAt: true },
  });
  out.qaClass = qa;
  if (qa) {
    const members = await db.classMember.count({ where: { classroomId: qa.id } });
    const assignments = await db.assignment.count({ where: { classroomId: qa.id } });
    const lqs = await db.liveQuiz.findMany({ where: { classroomId: qa.id }, select: { status: true } });
    const notifications = await db.notification.count({ where: { classroomId: qa.id } });
    const qaAssignments = await db.assignment.findMany({ where: { classroomId: qa.id }, select: { id: true } });
    const dones = await db.assignmentDone.count({ where: { assignmentId: { in: qaAssignments.map((a) => a.id) } } });
    out.qaDelta = {
      members,
      assignments,
      assignmentDones: dones,
      liveQuizzes: lqs.length,
      liveQuizStatuses: lqs.map((l) => l.status),
      notifications,
    };
  }

  // 2) Pre-existing active LiveQuiz in class 139932 — must be untouched (still active)
  const c139932 = await db.classroom.findFirst({
    where: { code: "139932" },
    select: { id: true, code: true, name: true },
  });
  out.class139932 = c139932;
  if (c139932) {
    const actives = await db.liveQuiz.findMany({
      where: { classroomId: c139932.id, status: "active" },
      select: { id: true, status: true, startedAt: true, endedAt: true },
    });
    out.activeLiveQuizzes139932 = actives;
  }

  // 3) d-fixture class 413643 (zero-write replay source) — existence check
  const c413643 = await db.classroom.findFirst({
    where: { code: "413643" },
    select: { id: true, code: true },
  });
  out.fixture413643 = c413643 ?? null;

  // 4) ED-2 guest Attempt — existence check
  const att = await db.attempt.findUnique({
    where: { id: "cmvb6cdgs003up1eobv4myf78" },
    select: { id: true, book: true, category: true, lesson: true },
  });
  out.ed2Attempt = att ?? null;

  console.log(JSON.stringify(out, null, 2));
  await db.$disconnect();
}

main().catch((e) => {
  console.error("ERROR:", e);
  process.exit(1);
});
