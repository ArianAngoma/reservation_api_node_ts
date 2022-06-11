import {Router} from 'express';
import {body} from 'express-validator';

import {EUserRole} from '../interfaces';
import {
  validateFields,
  emailExists,
  identificationExists,
} from '../middlewares';

const router = Router();

router.post('/register', [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('username').not().isEmpty().withMessage('Username is required'),
  body('email').not().isEmpty().withMessage('Email is required'),
  body('email').custom(emailExists).withMessage('Email already exists'),
  body('identification').isNumeric()
      .withMessage('Identification is required and must be numeric'),
  body('identification').custom(identificationExists)
      .withMessage('Identification already exists'),
  body('role').isIn(Object.values(EUserRole)).withMessage('Role is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
  validateFields,
], () => console.log('Register'));

router.post('/login', [
  body('email').not().isEmpty().withMessage('Email is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
  validateFields,
], () => console.log('Login'));

export default router;
