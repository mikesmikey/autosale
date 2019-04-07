class Subject {
  constructor(form) {

    this.facultyId = form.facultyId ? form.facultyId : 0
    this.branchId = form.branchId ? form.branchId : 0
    this.subjectId = form.subject_id ? form.subject_id : ''
    this.subjectName = form.subject_name ? form.subject_name : ''
    this.credits = form.credits ? form.credits : 0
  }
}
export default Subject
