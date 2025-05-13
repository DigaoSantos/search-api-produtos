import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProdutoDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const produtoId = parseInt(id, 10);
    if (isNaN(produtoId)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }

    const produto = await prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    return res.status(200).json(produto);
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};
  
  
  
