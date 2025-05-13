import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { produtoUpdateSchema } from '../../schemas/produtoUpdateSchema';

export async function atualizarProduto(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  const parseResult = produtoUpdateSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ erro: 'Dados inválidos', detalhes: parseResult.error.errors });
  }

  try {
    const produtoExistente = await prisma.produto.findUnique({
      where: { id },
    });

    if (!produtoExistente) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    const produtoAtualizado = await prisma.produto.update({
      where: { id },
      data: parseResult.data,
    });

    return res.json(produtoAtualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao atualizar produto' });
  }
}
