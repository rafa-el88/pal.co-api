import dotenv from 'dotenv';
import * as waitingListAccountService from '../services/waitingListAccountService.js';
import { validateWaitingList } from '../validations/waitingListAccountValidations.js';

dotenv.config();

export const create = async (req, res) => {
  const { name, ddd, phone, email, connectionMusic } = req.body;

  const validation = validateWaitingList(req.body);

  if (!validation.isValid) {
    return res.status(400).json({ success: false, errors: validation.errors });
  }

  try {
    const result = await waitingListAccountService.addAccountToWaitingList(
      name,
      ddd,
      phone,
      email,
      connectionMusic
    );

    if (result && result.duplicate) {
      const errorMessage = `${result.field} já cadastrado para ${result.name || 'outro usuário'}`;
      return res.status(400).json({ 
        success: false,
        message: errorMessage,
        duplicateData: {
          field: result.field,
          name: result.name || 'Usuário existente'
        }
      });
    }

    res.status(201).json({ 
      success: true, 
      message: 'Dados adicionados à lista de espera' 
    });
  } catch (error) {
    console.error("Error adding account to waiting list:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Falha ao adicionar conta à lista de espera', 
      error: error.message 
    });
  }
};
