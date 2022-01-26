import { Op } from 'sequelize';
import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import Queue from '../../lib/Queue';
import DetailMail from '../jobs/DetailMail';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      where: {
        product: {
          [Op.iLike]: `%${req.query.q || ''}%`,
        },
      },
      attributes: [
        'id',
        'product',
        'deliveryman_id',
        'recipient_id',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      order: [['id', 'asc']],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email', 'avatar_id'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'zipcode',
            'number',
            'state',
            'city',
            'add_on',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path', 'name'],
        },
      ],
    });
    return res.json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      attributes: [
        'id',
        'product',
        'deliveryman_id',
        'recipient_id',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'add_on',
            'city',
            'state',
            'zipcode',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ Error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Field validation fails' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    const CheckDeliverymanExists = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });

    const checkRecipientExists = await Recipient.findOne({
      where: { id: recipient_id },
    });

    if (!(CheckDeliverymanExists || checkRecipientExists)) {
      return res.status.json('Deliveryman and Recipient does not exist');
    }

    if (!checkRecipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    if (!CheckDeliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const delivery = await Delivery.create({
      recipient_id,
      deliveryman_id,
      product,
    });

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const recipient = await Recipient.findByPk(recipient_id);

    await Queue.add(DetailMail.key, {
      delivery,
      deliveryman,
      recipient,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'All fields need to be filled' });
    }

    const { deliveryman_id, recipient_id } = req.body;

    const CheckDeliverymanExists = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });

    const checkRecipientExists = await Recipient.findOne({
      where: { id: recipient_id },
    });

    if (!(CheckDeliverymanExists || checkRecipientExists)) {
      return res.status.json('Deliveryman and Recipient does not exist');
    }

    if (!checkRecipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    if (!CheckDeliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    const { id, product } = await delivery.update(req.body);

    return res.json([id, product, recipient_id, deliveryman_id]);
  }

  async delete(req, res) {
    const delivery = await Delivery.findOne({
      where: { id: req.params.id, canceled_at: null },
    });

    if (!delivery) {
      return res
        .status(401)
        .json({ Error: 'Delivery does not exist or is already canceled' });
    }

    delivery.canceled_at = new Date();
    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveryController();
