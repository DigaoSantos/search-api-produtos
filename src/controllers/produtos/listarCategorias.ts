import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listarCategorias = async (req: Request, res: Response) => {
    try {
      const categorias = await prisma.produto.findMany({
        where: {
          categoria: {
            not: '',
          },
        },
        select: {
          categoria: true,
        },
        distinct: ['categoria'],
      });
  
      const nomesCategorias = categorias.map((item) => item.categoria);
  
      return res.status(200).json(nomesCategorias);
    } catch (error) {
      console.error('Erro ao listar categorias:', error);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };
