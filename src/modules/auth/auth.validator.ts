import Joi from 'joi';
export const signUpSchema = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(6).max(16).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.string().min(6).max(16).required().messages({
    'string.min': 'Confirm password must be at least {#limit} characters long',
    'string.max': 'Confirmed password cannot exceed {#limit} characters',
    'any.required': 'Confirmed password  is required',
  }),
  name: Joi.string().required().messages({
    'string.pattern.base': 'Invalid Name',
    'any.required': 'Name is required',
  }),
});
export const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot exceed {#limit} characters',
    'any.required': 'Password is required',
  }),
});
