import { Router } from 'express';
import { listarProdutos } from '../controllers/produtos/listarProdutos';
import { validateQuery } from '../middlewares/validateQuery';
import { produtoQuerySchema } from '../schemas/produtoQuerySchema';
import { criarProduto } from '../controllers/produtos/criarProduto';
import { atualizarProduto } from '../controllers/produtos/atualizarProduto';
import { deletarProduto } from '../controllers/produtos/deletarProduto';
import { getProdutoDetails } from '../controllers/produtos/produtosController';
import { listarCategorias } from '../controllers/produtos/listarCategorias';

const router = Router();

router.get('/', validateQuery(produtoQuerySchema), listarProdutos);
router.post('/', criarProduto);
router.put('/:id', atualizarProduto);
router.delete('/:id', deletarProduto);
router.get('/categorias', listarCategorias);
router.get('/:id', getProdutoDetails);

export default router;
