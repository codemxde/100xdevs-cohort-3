import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();
const app = express();

app.use(express.json());

app.post('/create', async (req: Request, res: Response) => {
  try {
    const { username, password, age } = req.body;

    await client.user.create({
      data: { username, password, age },
    });

    console.log('user created');
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ fail: 'unable to create user' });
  }
});

app.listen(3000);
