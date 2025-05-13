import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { produtoSchema } from '../../schemas/produtoSchema';

export async function criarProduto(req: Request, res: Response) {
  const parseResult = produtoSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ erro: 'Dados inválidos', detalhes: parseResult.error.errors });
  }

  try {
    const produto = await prisma.produto.create({
      data: parseResult.data,
    });

    return res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao criar produto' });
  }
}
