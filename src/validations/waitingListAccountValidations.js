import Joi from "joi";

const createWaitingListAccountSchema = Joi.object({
  name: Joi.string().required().max(255).messages({
    'string.empty': 'Nome é obrigatório',
    'string.max': 'Nome deve ter no máximo 255 caracteres',
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
  dateCreate: Joi.any().optional(), // Permite o campo dateCreate sem validação
  connectionMusic: Joi.object({
    value: Joi.string().required(),
    text: Joi.string().allow(null)
  }).required().messages({
    'any.required': 'Conexão com música é obrigatória'
  })
});

const validateWaitingList = (data) => {
    const options = {
        abortEarly: false, // Isso faz retornar todos os erros ao invés de parar no primeiro
        allowUnknown: false // Não permite campos desconhecidos
    };

    const { error } = createWaitingListAccountSchema.validate(data, options);
    
    if (error) {
        const errorMessages = error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
        }));
        
        return {
            isValid: false,
            errors: errorMessages
        };
    }

    return {
        isValid: true,
        errors: []
    };
};

export { createWaitingListAccountSchema, validateWaitingList };