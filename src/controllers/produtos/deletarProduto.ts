import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

export async function deletarProduto(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  try {
    const produto = await prisma.produto.findUnique({ where: { id } });

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    await prisma.produto.delete({ where: { id } });

    return res.status(204).send(); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao deletar produto' });
  }
}