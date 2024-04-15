import express from 'express'
import { AcademicSemesterValidation } from './academicSemester.validation'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterController } from './academicSemester.controller'
const router = express.Router()

router.post(
  '/academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterSchema),
  AcademicSemesterController.createAcademicSemester,
)
router.patch('/:id', AcademicSemesterController.updateSemester)

router.get('/academic-semester', AcademicSemesterController.getAllSemesters)
router.get('/:id', AcademicSemesterController.getSingleSemesters)
router.delete('/:id', AcademicSemesterController.deleteSemester)

export const AcademicSemesterRouter = router
