import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { ENUM_USER_ROLE } from '../../enums/user'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post(
  '/academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultySchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.createAcademicFaculty,
)
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultySchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
  ),
  AcademicFacultyController.updateAcademicFaculty,
)

router.get('/academic-faculty', AcademicFacultyController.getAllAcademicFaculty)
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteAcademicFaculty,
)

export const AcademicFacultyRouter = router
