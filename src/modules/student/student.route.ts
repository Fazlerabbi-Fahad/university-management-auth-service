import express from 'express'
import { StudentController } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { StudentValidation } from './student.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../enums/user'

const router = express.Router()

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  StudentController.deleteStudent,
)
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentController.updateStudent,
)
router.get('/:id', StudentController.getSingleStudent)
router.get('/', StudentController.getAllStudents)

export const StudentRouter = router
