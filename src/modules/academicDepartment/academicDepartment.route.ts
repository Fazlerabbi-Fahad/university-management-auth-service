import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../enums/user'
const router = express.Router()

router.post(
  '/academic-Department',
  validateRequest(AcademicDepartmentValidation.createAcademicDepartmentSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.createAcademicDepartment,
)
router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.updateAcademicDepartment,
)

router.get(
  '/academic-Department',
  AcademicDepartmentController.getAllAcademicDepartment,
)
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicDepartmentController.deleteAcademicDepartment,
)

export const AcademicDepartmentRouter = router
