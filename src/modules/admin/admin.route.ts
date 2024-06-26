import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AdminController } from './admin.controller'
import { AdminValidation } from './admin.validation'
import { ENUM_USER_ROLE } from '../../enums/user'
import auth from '../../middlewares/auth'

const router = express.Router()

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteAdmin,
)
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.updateAdmin,
)
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.getSingleAdmin,
)
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.getAllAdmin,
)

export const AdminRouter = router
