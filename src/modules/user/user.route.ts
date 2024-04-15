import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserSchema),
  UserController.createUser,
)

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserSchema),
  UserController.updateUser,
)

router.get('/user', UserController.getAllUser)
router.get('/:id', UserController.getSingleUser)
router.delete('/:id', UserController.deleteUser)

export const UserRouter = router
