interface Produto {
  id: number;
  nome: string;
  preco: number;
  disponivel: boolean;
}

class ProdutoService {
  private produtos: Produto[] = [];

  adicionarProduto(p: Produto): void {
    this.produtos.push(p);
    console.log(`Produto adicionado: ${p.nome}`);
  }

  listarProdutos(): Produto[] {
    return this.produtos;
  }

  atualizarProduto(
    id: number,
    novoNome: string,
    novoPreco: number,
    disponivel: boolean
  ): boolean {
    const produto = this.produtos.find((p) => p.id === id);
    if (produto) {
      produto.nome = novoNome;
      produto.preco = novoPreco;
      produto.disponivel = disponivel;
      console.log(`Produto atualizado: ${produto.nome}`);
      return true;
    }
    console.log("Produto não encontrado!");
    return false;
  }

  removerProduto(id: number): boolean {
    const index = this.produtos.findIndex((p) => p.id === id);
    if (index !== -1) {
      const removido = this.produtos.splice(index, 1);
      console.log(`Produto removido: ${removido[0]?.nome}`);
      return true;
    }
    console.log("Produto não encontrado!");
    return false;
  }
}

const service = new ProdutoService();

service.adicionarProduto({
  id: 1,
  nome: "Notebook",
  preco: 3500,
  disponivel: true,
});
service.adicionarProduto({ id: 2, nome: "Mouse", preco: 80, disponivel: true });

console.log("Lista de produtos:", service.listarProdutos());

service.atualizarProduto(2, "Mouse Gamer", 120, true);
console.log("Lista de produtos após atualização:", service.listarProdutos());

service.removerProduto(1);
console.log("Lista final:", service.listarProdutos());
