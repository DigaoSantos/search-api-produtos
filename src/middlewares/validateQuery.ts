import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        erro: 'Parâmetros inválidos',
        detalhes: result.error.errors,
      });
    }

    req.query = result.data;
    next();
  };
}
