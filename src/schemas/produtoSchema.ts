import { z } from 'zod';

export const produtoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  preco: z.number().positive('Preço deve ser maior que 0'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  imagem: z.string().url('Imagem deve ser uma URL válida').optional() // Campo imagem como URL
});
