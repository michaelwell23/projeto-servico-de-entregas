import { Op } from 'sequelize';
import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.query.q || ''}`,
        },
      },
    });

    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id, {
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'add_on',
        'state',
        'city',
        'zipcode',
      ],
    });
    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      add_on: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zipcode: Yup.string().max(11).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'All fields need to be filled' });
    }

    const recipientExist = await Recipient.findOne({
      where: {
        name: req.body.name,
        street: req.body.street,
        number: req.body.number,
      },
    });

    if (recipientExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json({ recipient });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      add_on: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zipcode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'All fields need to be filled' });
    }

    const { name } = req.body;
    const recipient = await Recipient.findByPk(req.params.id);

    if (name && name !== recipient.name) {
      const recipientExist = await Recipient.findOne({ where: { name } });

      if (recipientExist) {
        return res.status(400).json({ Error: 'Recipients already exists' });
      }
    }

    const updatedRecipient = await recipient.update(req.body);

    return res.json(updatedRecipient);
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not exist' });
    }

    await Recipient.destroy({ where: { id } });

    return res.status(200).json('Recipient has been deleted successfully!');
  }
}

export default new RecipientController();
