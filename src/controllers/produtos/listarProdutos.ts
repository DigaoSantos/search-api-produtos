import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

export async function listarProdutos(req: Request, res: Response) {
  try {
    const {
      search,
      categoria,
      precoMin,
      precoMax,
      page = '1',
      limit = '10',
    }: {
      search?: string;
      categoria?: string;
      precoMin?: string;
      precoMax?: string;
      page?: string;
      limit?: string;
    } = req.query;

    const pagina = parseInt(page, 10);
    const limite = parseInt(limit, 10);
    const precoMinNum = precoMin !== undefined ? parseFloat(precoMin) : undefined;
    const precoMaxNum = precoMax !== undefined ? parseFloat(precoMax) : undefined;

    if (
      isNaN(pagina) || pagina < 1 ||
      isNaN(limite) || limite < 1
    ) {
      return res.status(400).json({ erro: 'Parâmetros inválidos' });
    }

    const skip = (pagina - 1) * limite;

    const where: any = {};

    if (search) {
      where.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { descricao: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoria) {
      where.categoria = { equals: categoria };
    }

    if (precoMinNum !== undefined || precoMaxNum !== undefined) {
      where.preco = {};
      if (precoMinNum !== undefined) where.preco.gte = precoMinNum;
      if (precoMaxNum !== undefined) where.preco.lte = precoMaxNum;
    }

    const [produtos, total] = await Promise.all([
      prisma.produto.findMany({
        where,
        skip,
        take: limite,
        orderBy: { criadoEm: 'desc' },
      }),
      prisma.produto.count({ where }),
    ]);

    return res.json({
      pagina,
      totalPaginas: Math.ceil(total / limite),
      totalRegistros: total,
      produtos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
}