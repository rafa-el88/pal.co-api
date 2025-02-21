const dotenv = require('dotenv');
dotenv.config();
const waitingListAccountService = require('../services/waitingListAccountService');
import { createWaitingListAccountSchema } from '../validations/waitingListAccountValidations';

exports.create = async (req, res) => {
  const { name, ddd, phone, email } = req.body;

  const { error } = createWaitingListAccountSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const result = await waitingListAccountService.addAccountToWaitingList(name, ddd, phone, email);

    if (result && result.duplicate) {
      return res.status(400).json({ message: `${result.field} já cadastrado para ${result.name}` });
    }

    res.status(201).json({ message: 'Conta adicionada à lista de espera' });
  } catch (error) {
    console.error("Error adding account to waiting list:", error);
    res.status(500).json({ message: 'Falha ao adicionar conta à lista de espera' });
  }
};
