import * as Yup from 'yup';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Delivery from '../models/Delivery';

import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async index(req, res) {
    const { id } = req.params;

    const deliveryExists = await Delivery.findOne({
      where: { id },
    });

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id: id },
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['product', 'deliveryman_id', 'recipient_id'],
        },
      ],
    });

    return res.json(deliveryProblems);
  }

  async show(req, res) {
    const problems = await DeliveryProblem.findAll();

    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'All fields need to be filled' });
    }

    const { id } = req.params;
    const { description } = req.body;

    const delivery = await Delivery.findOne({
      where: { id },
    });

    if (!delivery) {
      return res.status(400).json({ Error: 'Delivery does not exist' });
    }

    const problem = await DeliveryProblem.create({
      description,
      delivery_id: id,
    });

    delivery.canceled_at = new Date();
    delivery.save();

    return res.json(problem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryProblemExists = await DeliveryProblem.findOne({
      where: { id },
    });

    if (!deliveryProblemExists) {
      return res.status(400).json({ error: "It's problem does not exists" });
    }

    const delivery = await Delivery.findByPk(
      deliveryProblemExists.delivery_id,
      {
        include: [
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['name', 'email'],
          },
        ],
      }
    );

    if (!delivery) {
      return res.status(400).json('This delivery does not exists');
    }

    if (delivery.canceled_at) {
      return res.status(400).json('This delivery has been canceled');
    }

    if (delivery.end_date && delivery.signature_id) {
      return res.status(400).json('This delivery already completed');
    }

    delivery.update(
      {
        canceled_at: new Date(),
      },
      {
        where: {
          id: deliveryProblemExists.delivery_id,
        },
      }
    );

    const startDate = format(
      delivery.start_date,
      "'dia' dd 'de' MMMM', ??s' H:mm'h'",
      { locale: pt }
    );

    await Queue.add(CancellationMail.key, {
      delivery,
      deliveryman: delivery.deliveryman,
      problem: deliveryProblemExists,
      startDate,
    });

    await DeliveryProblem.destroy({
      where: { id },
    });

    return res.status(200).json();
  }
}

export default new DeliveryProblemController();
