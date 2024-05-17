import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { FacultyController } from './faculty.controller'
import { FacultyValidation } from './faculty.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../enums/user'

const router = express.Router()

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultyController.deleteFaculty,
)
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultyController.updateFaculty,
)
router.get('/:id', FacultyController.getSingleFaculty)
router.get('/', FacultyController.getAllFaculty)

export const FacultyRouter = router
