import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const produtos = [
  {
    nome: "Tênis",
    descricao: "Tênis de corrida",
    preco: 199.99,
    categoria: "Esportes",
    imagem: "https://media.istockphoto.com/id/1324624694/pt/foto/fitness-woman-running-training-for-marathon-on-sunny-coast-trail.jpg?s=1024x1024&w=is&k=20&c=QIBx4IdhE7R66gEAZxPWP_zOf3Vbuh3Ozgx3th6xsmI="
  },
  {
    nome: "Camiseta Dry Fit",
    descricao: "Camiseta esportiva respirável",
    preco: 89.90,
    categoria: "Esportes",
    imagem: "https://media.istockphoto.com/id/1152601146/pt/foto/confident-young-macho-man-with-arms-crossed.jpg?s=1024x1024&w=is&k=20&c=upWafi2hpHhSUfa0HDKK9u1iQgU2ss8V7ocjiUI3Zu0="
  },
  {
    nome: "Bola de Futebol",
    descricao: "Bola oficial tamanho 5",
    preco: 129.00,
    categoria: "Esportes",
    imagem: "https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    nome: "Garrafa Térmica",
    descricao: "Garrafa térmica de 1 litro",
    preco: 79.50,
    categoria: "Acessórios",
    imagem: "https://media.istockphoto.com/id/1575666186/pt/foto/beautiful-modern-water-bottle-for-an-active-lifestyle.jpg?s=1024x1024&w=is&k=20&c=f3S6IlBJPJsgWXzlzu71Pkh_KTG9PuVRCxgAkjPXd3k="
  },
  {
    nome: "Mochila Esportiva",
    descricao: "Mochila resistente à água para academia",
    preco: 149.90,
    categoria: "Esportes",
    imagem: "https://media.istockphoto.com/id/1151250322/pt/foto/sports-bag-with-sports-equipment.jpg?s=1024x1024&w=is&k=20&c=bdVIqomfFVySzOVZSYNug4iOe7R4ezoYGwmsWjVtnwg="
  },
  {
    nome: "Luvas de Ciclismo",
    descricao: "Luvas com acolchoamento e ventilação",
    preco: 59.99,
    categoria: "Ciclismo",
    imagem: "https://media.istockphoto.com/id/1302463889/pt/foto/male-cyclist-riding-bicycle-on-road.jpg?s=1024x1024&w=is&k=20&c=e2AXAfteAQPYiqNiQMn5lEgNIL1_FYuyam1aecKm7jY="
  },
  {
    nome: "Óculos de Natação",
    descricao: "Óculos com proteção UV e antineblina",
    preco: 45.00,
    categoria: "Natação",
    imagem: "https://media.istockphoto.com/id/149456507/pt/foto/piscina-de-nata%C3%A7%C3%A3o.jpg?s=1024x1024&w=is&k=20&c=S13zi8xugycBNa4TEEkP1tsYeU1249xHjekQzT3iExg="
  },
  {
    nome: "Shorts de Corrida",
    descricao: "Shorts leve e com bolsos",
    preco: 69.90,
    categoria: "Esportes",
    imagem: "https://media.istockphoto.com/id/1478466587/pt/foto/legs-two-male-runners-running-city-marathon-race-athletes-jogging-on-asphalt-road-summer.jpg?s=1024x1024&w=is&k=20&c=YeTt4FuA0o8WChOSA8n8C05Pa6ENmd1n3iyLCgBvZGg="
  },
  {
    nome: "Toalha Esportiva",
    descricao: "Toalha de microfibra super absorvente",
    preco: 39.90,
    categoria: "Acessórios",
    imagem: "https://media.istockphoto.com/id/1272778113/pt/foto/fit-woman-drinking-from-water-bottle.jpg?s=1024x1024&w=is&k=20&c=jOw9KJ-R9pccW6tdBgah4PLkJbHre92GFaxoLwqcoWM="
  },
  {
    nome: "Relógio Fitness",
    descricao: "Relógio com monitoramento cardíaco",
    preco: 299.00,
    categoria: "Tecnologia",
    imagem: "https://media.istockphoto.com/id/1185615514/pt/foto/setting-smart-watch.jpg?s=1024x1024&w=is&k=20&c=U08rNaApneYGpbg-edmQkZkuJWUod40HBYVMeMxtCtM="
  }
];

async function addProdutos() {
  try {
    for (const produto of produtos) {
      const createdProduto = await prisma.produto.create({
        data: {
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco,
          categoria: produto.categoria,
          imagem: produto.imagem,
        },
      });
      console.log(`Produto adicionado: ${createdProduto.nome}`);
    }
    console.log('Todos os produtos foram adicionados com sucesso.');
  } catch (error) {
    console.error('Erro ao adicionar produtos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addProdutos();
