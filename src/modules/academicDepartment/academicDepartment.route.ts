import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
const router = express.Router()

router.post(
  '/academic-Department',
  validateRequest(AcademicDepartmentValidation.createAcademicDepartmentSchema),
  AcademicDepartmentController.createAcademicDepartment,
)
router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentSchema),
  AcademicDepartmentController.updateAcademicDepartment,
)

router.get(
  '/academic-Department',
  AcademicDepartmentController.getAllAcademicDepartment,
)
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment)
router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment)

export const AcademicDepartmentRouter = router
