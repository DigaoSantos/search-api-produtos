import { z } from 'zod';

export const produtoUpdateSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').optional(),
  descricao: z.string().min(1, 'Descrição é obrigatória').optional(),
  preco: z.number().positive('Preço deve ser maior que 0').optional(),
  categoria: z.string().min(1, 'Categoria é obrigatória').optional(),
  imagem: z.string().url('Imagem deve ser uma URL válida').optional()
});

