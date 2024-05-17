import express from 'express'
import { AcademicSemesterValidation } from './academicSemester.validation'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterController } from './academicSemester.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../enums/user'
const router = express.Router()

router.post(
  '/academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.createAcademicSemester,
)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.updateSemester,
)

router.get('/academic-semester', AcademicSemesterController.getAllSemesters)
router.get('/:id', AcademicSemesterController.getSingleSemesters)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.deleteSemester,
)

export const AcademicSemesterRouter = router
