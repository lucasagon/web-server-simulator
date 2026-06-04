# Simulador de Arquitetura de Servidores

Uma aplicação web interativa para explorar arquiteturas de infraestrutura, simular carga em tempo real e comparar custos entre diferentes provedores de cloud.

## O que é

Este projeto nasceu de uma necessidade prática: entender como diferentes configurações de infraestrutura se comportam sob carga, antes de investir em implementação real. Em vez de tabelas estáticas, a ideia é justamente permitir que alguém possa desenhar uma arquitetura, conectar componentes e ver em tempo real como a carga flui, onde aparecem gargalos e quanto tudo isso custaria em AWS, Azure, GCP ou ambiente local.

## Como funciona

O aplicativo roda localmente no seu navegador. Você arrasta componentes (servidores, bancos de dados, cache, load balancers) para um canvas, conecta eles entre si e configura parâmetros como throughput e taxa de falha. A simulação então executa a cada segundo, calculando:

- Quanto tráfego cada componente processa
- Onde aparecem gargalos de capacidade
- Quantas requisições falham
- Latência total da arquitetura
- Custo mensal estimado

As conexões mudam de cor conforme o fluxo intensifica, e o painel lateral mostra métricas detalhadas de cada componente.

## Por que foi feito assim

Algumas decisões técnicas que guiaram o projeto:

**React + TypeScript + Vite**: A interface é bastante interativa (drag-drop, seleção, edição em tempo real). React tornou natural gerenciar estado e atualizar a UI conforme a simulação roda. TypeScript ajuda a manter tipos consistentes entre componentes, canvas e engine de simulação.

**React Flow para o canvas**: Em vez de implementar drag-drop e conexões do zero, React Flow já resolve essas coisas bem. Depois vinha o desafio de fazer inputs dentro dos nós (sliders) não conflitarem com o movimento do canvas — isso foi corrigido adicionando `stopPropagation()` nos eventos de mouse.

**localStorage para persistência**: Não há backend aqui. A arquitetura que você desenha fica salva no navegador e restaura na próxima visita. Se quiser compartilhar com alguém, existe um sistema de export/import em formato `.din` (JSON simples com extensão customizada).

**Cálculo de custo simplificado**: Os custos que aparecem combinam base mensal do componente, capacidade configurada e tráfego processado. Não é calibrado para precisão operacional, mas serve para comparação qualitativa e exploração de cenários.

## Stack

- **Frontend**: React 18, TypeScript, Vite
- **Canvas**: React Flow 11
- **Estilo**: Tailwind CSS, PostCSS
- **Ícones**: Lucide React

## Como rodar

```bash
npm install
npm run dev
```

Abre a URL exibida pelo Vite (normalmente `http://localhost:5173`).

Para build de produção:

```bash
npm run build
npm run preview
```

## Como usar

1. **Arraste componentes** do painel esquerdo para o canvas (cliente, servidor, banco de dados, etc.)
2. **Conecte componentes** clicando e arrastando das alças laterais de cada card
3. **Selecione um componente** para editar:
   - Nome e capacidade máxima
   - Throughput configurado (para cliente/servidor)
   - Taxa de falha
   - Latência base
   - Parâmetros específicos (rate limit, cache hit, tamanho de fila)
4. **Inicie a simulação** com o botão play na barra superior
5. **Altere a cloud** (AWS, Azure, GCP, local) para ver impacto nos custos
6. **Exporte sua arquitetura** em `.din` para salvar/compartilhar
7. **Importe um arquivo** para restaurar uma arquitetura anterior

## Componentes disponíveis

- **Cliente**: Gera tráfego inicial configurável
- **Servidor**: Processa requisições com capacidade máxima e latência
- **Load Balancer**: Distribui tráfego entre múltiplos destinos
- **Cache**: Reduz latência e pode aplicar hit rate
- **Message Queue**: Acumula requisições em fila quando sobrecarregado
- **API Gateway**: Aplica rate limit e rejeita excesso
- **Banco de Dados**: Afetado por carga, falhas podem aumentar

## O que a simulação não faz

A lógica de simulação segue um modelo simplificado. Não temos:

- Distribuição realista de latências (apenas soma)
- Fan-out/fan-in complexo com múltiplas requisições por operação
- Cache invalidation ou coerência entre instâncias
- Padrões como circuit breaker ou retry automático
- Custo de transferência de dados entre regiões
- Efeitos de resiliência como bulkheads ou timeouts

A ideia é exploração e comparação qualitativa, não previsão operacional precisa.

## Arquitetura interna

```
src/
├── App.tsx                      # Orquestração principal, estado do projeto
├── components/
│   ├── Toolbar.tsx              # Ações e seletor de cloud
│   ├── Sidebar.tsx              # Catálogo de componentes
│   ├── SimulationCanvas.tsx     # Wrapper do React Flow
│   ├── ComponentNode.tsx        # Card visual de cada componente
│   ├── ConfigPanel.tsx          # Edição de parâmetros
│   └── CostPanel.tsx            # Painel de custo mensal
├── engine/
│   └── simulationEngine.ts      # Lógica de simulação (tick, processamento)
├── services/
│   ├── costs.ts                 # Cálculo de custo por componente
│   ├── importExport.ts          # Import/export .din
│   └── storage.ts               # Persistência em localStorage
├── utils/
│   ├── flow.ts                  # Adaptadores para nodes/edges do React Flow
│   └── format.ts                # Formatadores (percentual, número)
├── data/
│   ├── catalog.ts               # Defaults e ícones por tipo
│   └── defaultProject.ts        # Arquitetura inicial de exemplo
└── types.ts                     # Tipos centrais (Node, Edge, etc)
```

## Próximos passos sugeridos

**Curto prazo**:
- Aprofundar validação de arquivos `.din` importados
- Adicionar testes mais robustos para cenários de sobrecarga
- Melhorar precisão da simulação (distribuição de latência, reprocessamento)

**Médio prazo**:
- Permitir salvar arquitetura em cloud (backend simples)
- Adicionar presets de arquiteturas conhecidas (3-tier clássico, microserviços, etc)
- Refinar custo para refletir melhor tamanho de dados e região

**Mais longe**:
- Integração com dados reais de pricing de cloud
- Análise de trade-off entre componentes
- Histórico de versões de uma arquitetura

## Licença

MIT

---

**Desenvolvido por**: Lucas Agon  
**Última atualização**: Junho de 2026
