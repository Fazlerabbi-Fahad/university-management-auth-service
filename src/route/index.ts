import express from 'express'
import { UserRouter } from '../modules/user/user.route'
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route'
import { StudentRouter } from '../modules/student/student.route'
import { AuthRouter } from '../modules/auth/auth.route'
import { FacultyRouter } from '../modules/faculty/faculty.route'
import { AdminRouter } from '../modules/admin/admin.route'
const router = express.Router()

const modulesRouter = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/student',
    route: StudentRouter,
  },
  {
    path: '/faculty',
    route: FacultyRouter,
  },
  {
    path: '/admin',
    route: AdminRouter,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
]

modulesRouter.forEach(route => router.use(route.path, route.route))

export default router
