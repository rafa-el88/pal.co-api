const Joi = require('joi');

const createWaitingListAccountSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Nome é obrigatório',
    'any.required': 'Nome é obrigatório'
  }),
  ddd: Joi.string().required().length(2).messages({
    'string.empty': 'DDD é obrigatório',
    'string.length': 'DDD deve ter 2 dígitos',
    'any.required': 'DDD é obrigatório'
  }),
  phone: Joi.string().required().length(9).messages({
    'string.empty': 'Telefone é obrigatório',
    'string.length': 'Telefone deve ter 9 dígitos',
    'any.required': 'Telefone é obrigatório'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email é obrigatório',
    'string.email': 'Email inválido',
    'any.required': 'Email é obrigatório'
  }),
  connectionMusic: Joi.object({
    value: Joi.string().required(),
    text: Joi.string().allow(null)
  }).required().messages({
    'any.required': 'Conexão com música é obrigatória'
  })
});

module.exports = {
  createWaitingListAccountSchema
};
