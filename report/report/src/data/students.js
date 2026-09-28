export const initialStudents = [
  {
    registerNumber: '23AD001', name: 'Saranya D', dob: '19-12-2007',
    department: 'Artificial Intelligence and Data Science', year: '2nd Year',
    semester1: { format: 'transcript', cgpa: null, subjects: [
      { code: '24TA101', name: 'Heritage of Tamils', credits: 1, grade: 'A+', result: 'P' },
      { code: '24BS151', name: 'Physics and Chemistry Laboratory', credits: 2, grade: 'S', result: 'P' },
      { code: '24CH101', name: 'Engineering Chemistry', credits: 3, grade: 'A+', result: 'P' },
      { code: '24PH101', name: 'Engineering Physics', credits: 3, grade: 'A+', result: 'P' },
      { code: '24AC101', name: 'Indian Constitution and Freedom Movement', credits: 0, grade: 'S', result: 'P' },
      { code: '24EN101', name: 'Technical English - I', credits: 3, grade: 'A+', result: 'P' },
      { code: '24MA102', name: 'Matrices and Differential Equations', credits: 4, grade: 'A', result: 'P' },
      { code: '24CS192', name: 'Design for Developers', credits: 4, grade: 'A+', result: 'P' },
      { code: '24CS193', name: 'Logic Building using Java', credits: 4, grade: 'S', result: 'P' },
    ] },
    semester2: { format: 'transcript', cgpa: null, subjects: [
      { code: '24EN291', name: 'Technical English - II', credits: 3, grade: 'A+', result: 'P' },
      { code: '24TA201', name: 'Tamils and Technology', credits: 1, grade: 'S', result: 'P' },
      { code: '24MA292', name: 'Probability Distributions and Statistics', credits: 4, grade: 'A', result: 'P' },
      { code: '24EE293', name: 'Basics of Electrical and Electronics for Computer Engineers', credits: 3, grade: 'A+', result: 'P' },
      { code: '24CS292', name: 'Web Technology', credits: 4, grade: 'A+', result: 'P' },
      { code: '24CS293', name: 'Problem Solving using Python for Computer Engineers', credits: 4, grade: 'A', result: 'P' },
      { code: '24CS294', name: 'Object Oriented Programming using Java', credits: 4, grade: 'A', result: 'P' },
    ] },
  },
  {
    registerNumber: '23AD002', name: 'Arun Kumar', dob: '02-11-2006',
    department: 'Artificial Intelligence and Data Science', year: '2nd Year',
    semester1: { cgpa: 8.4, subjects: [
      { code: 'MA101', name: 'Mathematics', internal: 22, external: 63 },
      { code: 'CS101', name: 'Programming', internal: 24, external: 66 },
      { code: 'PH101', name: 'Engineering Physics', internal: 21, external: 61 },
    ] },
    semester2: { cgpa: 8.6, subjects: [
      { code: 'MA201', name: 'Applied Mathematics', internal: 23, external: 65 },
      { code: 'CS201', name: 'Data Structures', internal: 24, external: 67 },
      { code: 'EC201', name: 'Digital Principles', internal: 23, external: 66 },
    ] },
  },
  {
    registerNumber: '23CS014', name: 'Meera Raj', dob: '21-04-2006',
    department: 'Computer Science and Engineering', year: '2nd Year',
    semester1: { cgpa: 9.3, subjects: [
      { code: 'MA101', name: 'Mathematics', internal: 25, external: 72 },
      { code: 'CS101', name: 'Programming', internal: 25, external: 71 },
      { code: 'PH101', name: 'Engineering Physics', internal: 23, external: 68 },
    ] },
    semester2: { cgpa: 9.0, subjects: [
      { code: 'MA201', name: 'Applied Mathematics', internal: 25, external: 70 },
      { code: 'CS201', name: 'Data Structures', internal: 24, external: 69 },
      { code: 'EC201', name: 'Digital Principles', internal: 24, external: 68 },
    ] },
  },
]

export function subjectGrade(total) {
  if (total >= 90) return 'O'
  if (total >= 80) return 'A+'
  if (total >= 70) return 'A'
  if (total >= 60) return 'B+'
  if (total >= 50) return 'B'
  if (total >= 40) return 'C'
  return 'F'
}

export function summarizeSemester(semester = {}) {
  const subjects = semester.subjects || []
  const transcriptMode = semester.format === 'transcript' || subjects.some((subject) => subject.credits !== undefined)
  const hasMarks = subjects.length > 0 && subjects.every((subject) => subject.internal !== undefined && subject.external !== undefined)
  const total = hasMarks ? subjects.reduce((sum, subject) => sum + Number(subject.internal || 0) + Number(subject.external || 0), 0) : 0
  const percentage = hasMarks ? Number((total / (subjects.length * 100) * 100).toFixed(1)) : null
  const credits = transcriptMode ? subjects.reduce((sum, subject) => sum + Number(subject.credits || 0), 0) : null
  const passed = subjects.length > 0 && subjects.every((subject) => subject.result !== undefined ? ['P', 'PASS'].includes(String(subject.result).toUpperCase()) : Number(subject.internal || 0) + Number(subject.external || 0) >= 40)
  const cgpa = semester.cgpa === null || semester.cgpa === undefined || semester.cgpa === '' ? null : Number(semester.cgpa)
  const normalizedSubjects = subjects.map((subject) => {
    if (!hasMarks) return { ...subject, credits: Number(subject.credits || 0), grade: subject.grade || '', result: subject.result || '' }
    const subjectTotal = Number(subject.internal || 0) + Number(subject.external || 0)
    return { ...subject, total: subjectTotal, grade: subjectGrade(subjectTotal) }
  })
  return { total, percentage, cgpa, credits, passed, hasMarks, transcriptMode, subjects: normalizedSubjects }
}
