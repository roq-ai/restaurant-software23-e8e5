import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { menuItemsValidationSchema } from 'validationSchema/menu-items';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMenuItems();
    case 'POST':
      return createMenuItems();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMenuItems() {
    const data = await prisma.menu_items.findMany({});
    return res.status(200).json(data);
  }

  async function createMenuItems() {
    await menuItemsValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.order_items?.length > 0) {
      const create_order_items = body.order_items;
      body.order_items = {
        create: create_order_items,
      };
    } else {
      delete body.order_items;
    }
    if (body?.reviews?.length > 0) {
      const create_reviews = body.reviews;
      body.reviews = {
        create: create_reviews,
      };
    } else {
      delete body.reviews;
    }
    const data = await prisma.menu_items.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
