import dotenv from 'dotenv';
import * as waitingListAccountService from '../services/waitingListAccountService.js';
// import { createWaitingListAccountSchema } from '../validations/waitingListAccountValidations.js';

dotenv.config();

export const create = async (req, res) => {
  const { name, ddd, phone, email, connectionMusic } = req.body;

  console.log('Request body:', req.body); // Log para depuração

  // const { error } = createWaitingListAccountSchema.validate(req.body);
  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message });
  // }

  try {
    const result = await waitingListAccountService.addAccountToWaitingList(
      name, 
      ddd, 
      phone, 
      email,
      connectionMusic
    );

    if (result && result.duplicate) {
      return res.status(400).json({ message: `${result.field} já cadastrado para ${result.name}` });
    }

    res.status(201).json({ message: 'Dados adicionados à lista de espera' });
  } catch (error) {
    console.error("Error adding account to waiting list:", error);
    console.error("Error details:", error.message);
    res.status(500).json({ message: 'Falha ao adicionar conta à lista de espera', error: error.message });
  }
};
