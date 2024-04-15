import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'
const router = express.Router()

router.post(
  '/academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultySchema),
  AcademicFacultyController.createAcademicFaculty,
)
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultySchema),
  AcademicFacultyController.updateAcademicFaculty,
)

router.get('/academic-faculty', AcademicFacultyController.getAllAcademicFaculty)
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty)
router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty)

export const AcademicFacultyRouter = router
