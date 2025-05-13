import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/prisma/client';

beforeEach(async () => {
  await prisma.produto.deleteMany();
});

describe('API /produtos', () => { 
  it('deve retornar uma lista de categorias únicas', async () => {
    await prisma.produto.createMany({
      data: [
        { nome: 'Produto A', descricao: 'desc', preco: 10, categoria: 'eletronicos' },
        { nome: 'Produto B', descricao: 'desc', preco: 20, categoria: 'moda' },
        { nome: 'Produto C', descricao: 'desc', preco: 30, categoria: 'eletronicos' },
        { nome: 'Produto D', descricao: 'desc', preco: 40, categoria: '' }, 
      ],
    });

    const res = await request(app).get('/produtos/categorias');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toContain('eletronicos');
    expect(res.body).toContain('moda');
    expect(res.body.length).toBe(2); 
  });

  // Teste POST - Criar Produto
  it('deve criar um novo produto com sucesso', async () => {
    const res = await request(app).post('/produtos').send({
      nome: 'Camiseta Dry',
      descricao: 'Ideal para corrida',
      preco: 79.9,
      categoria: 'roupas',
      imagem: 'https://example.com/imagem.jpg',
    });
  
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Camiseta Dry');
    expect(res.body.imagem).toBe('https://example.com/imagem.jpg');
  });

  // Teste GET - Listar Produtos
  it('deve retornar status 200 e um array de produtos', async () => {
    await prisma.produto.create({
      data: {
        nome: 'Produto 1',
        descricao: 'Teste',
        preco: 50,
        categoria: 'geral',
      },
    });

    const res = await request(app).get('/produtos');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.produtos)).toBe(true);
  });

  // Teste GET com filtro por nome
  it('deve aplicar filtro por nome', async () => {
    await prisma.produto.create({
      data: {
        nome: 'Camiseta Especial',
        descricao: 'Descrição',
        preco: 60,
        categoria: 'moda',
      },
    });

    const res = await request(app).get('/produtos?search=camiseta');

    expect(res.status).toBe(200);
    res.body.produtos.forEach((produto: any) => {
      expect(produto.nome.toLowerCase()).toContain('camiseta');
    });
  });

  // Teste GET com filtro por categoria
  it('deve aplicar filtro por categoria', async () => {
    await prisma.produto.create({
      data: {
        nome: 'Produto Roupa',
        descricao: 'Descrição',
        preco: 70,
        categoria: 'roupas',
      },
    });

    const res = await request(app).get('/produtos?categoria=roupas');

    expect(res.status).toBe(200);
    res.body.produtos.forEach((produto: any) => {
      expect(produto.categoria.toLowerCase()).toBe('roupas');
    });
  });

  // Teste GET com paginação
  it('deve aplicar paginação corretamente', async () => {
    await prisma.produto.createMany({
      data: [
        { nome: 'P1', descricao: 'D1', preco: 10, categoria: 'a' },
        { nome: 'P2', descricao: 'D2', preco: 20, categoria: 'b' },
        { nome: 'P3', descricao: 'D3', preco: 30, categoria: 'c' },
      ],
    });

    const res = await request(app).get('/produtos?page=1&limit=2');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.produtos)).toBe(true);
    expect(res.body.produtos.length).toBeLessThanOrEqual(2);
    expect(res.body.pagina).toBe(1);
  });

  // Teste GET com erro de parâmetros inválidos
  it('deve retornar erro 400 para parâmetros inválidos', async () => {
    const res = await request(app).get('/produtos?page=abc');

    expect(res.status).toBe(400);
    expect(res.body.erro).toBe('Parâmetros inválidos');
  });

  // Teste GET - Detalhamento do produto por ID
  describe('GET /produtos/:id', () => {
    it('deve retornar detalhes do produto quando o ID for válido', async () => {
      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto Detalhado',
          descricao: 'Detalhes do produto',
          preco: 99.9,
          categoria: 'detalhe',
        },
      });
    
      const res = await request(app).get(`/produtos/${produto.id}`);
    
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', produto.id);
      expect(res.body).toHaveProperty('nome', 'Produto Detalhado');
    });
    

    it('deve retornar erro 404 quando o produto não for encontrado', async () => {
      const res = await request(app).get('/produtos/9999'); 

      expect(res.status).toBe(404);
      expect(res.body.erro).toBe('Produto não encontrado');
    });

    it('deve retornar erro 400 para ID inválido', async () => {
      const res = await request(app).get('/produtos/abc'); 

      expect(res.status).toBe(400);
      expect(res.body.erro).toBe('ID inválido');
    });
  });

  // Teste PUT - Atualizar produto
  it('deve atualizar um produto existente', async () => {
    const produto = await prisma.produto.create({
      data: {
        nome: 'Original',
        descricao: 'desc',
        preco: 100,
        categoria: 'cat',
      },
    });
  
    const res = await request(app).put(`/produtos/${produto.id}`).send({
      nome: 'Camiseta Dry Fit',
      preco: 89.9,
      imagem: 'https://example.com/nova-imagem.jpg'
    });
  
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Camiseta Dry Fit');
    expect(res.body.imagem).toBe('https://example.com/nova-imagem.jpg');
  });

  // Teste DELETE - Excluir produto existente
  it('deve deletar um produto existente', async () => {
    const produto = await prisma.produto.create({
      data: {
        nome: 'Produto para deletar',
        descricao: 'desc',
        preco: 55,
        categoria: 'cat',
      },
    });

    const res = await request(app).delete(`/produtos/${produto.id}`);

    expect(res.status).toBe(204);
  });

  // Teste DELETE - Produto já deletado ou inexistente
  it('deve retornar 404 ao tentar deletar produto inexistente', async () => {
    const res = await request(app).delete(`/produtos/999999`);

    expect(res.status).toBe(404);
    expect(res.body.erro).toBe('Produto não encontrado');
  });

  // Teste GET - Listar categorias únicas
  it('deve retornar uma lista de categorias únicas', async () => {
    await prisma.produto.createMany({
      data: [
        { nome: 'Produto A', descricao: 'desc', preco: 10, categoria: 'eletronicos' },
        { nome: 'Produto B', descricao: 'desc', preco: 20, categoria: 'moda' },
        { nome: 'Produto C', descricao: 'desc', preco: 30, categoria: 'eletronicos' },
        { nome: 'Produto D', descricao: 'desc', preco: 40, categoria: '' },
      ],
    });

    const res = await request(app).get('/produtos/categorias');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toContain('eletronicos');
    expect(res.body).toContain('moda');
    expect(res.body.length).toBe(2);
  });
  
});
