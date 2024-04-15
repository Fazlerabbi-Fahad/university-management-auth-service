import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastStudent?.id ? lastStudent.id.substring(3) : undefined
}

export const generatedStudentId = async (
  academicSemester: IAcademicSemester,
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0')

  //incremented
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  incrementedId = `${academicSemester.year.substring(2)}-${incrementedId}-${academicSemester.code}`

  return incrementedId
}

export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}

export const generatedFacultyId = async () => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  incrementedId = `F-${incrementedId}`

  return incrementedId
}
