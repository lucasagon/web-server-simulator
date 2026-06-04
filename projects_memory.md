# Projects Memory - local-server

## Projeto
**Simulador de Arquitetura de Servidores** - aplicacao web local em React + TypeScript + Vite para montar arquiteturas, conectar componentes em um canvas React Flow, executar simulacao de carga em tempo real, visualizar gargalos e estimar custo mensal por cloud.

## Estado Atual
- Projeto inicializado e funcional localmente.
- Canvas com React Flow ativo, com drag and drop de componentes, conexoes, zoom, minimapa e centralizacao de visao.
- Persistencia do estado em `localStorage`.
- Exportacao e importacao de arquivos `.din` com JSON interno e validacao basica.
- Simulacao em ticks de 1 segundo com atualizacao de throughput, falhas, latencia, carga e status visual.
- Painel lateral de configuracao com edicao de parametros do componente selecionado.
- Painel expansivel de custo mensal com breakdown por componente e total por cloud.
- Exemplo inicial carregado automaticamente no primeiro uso.

## Stack
- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.x
- React Flow 11.11.4
- Tailwind CSS 3.4.17
- Lucide React
- PostCSS + Autoprefixer

## Estrutura Atual
```text
src/
├── App.tsx                         # orquestracao principal do simulador
├── components/
│   ├── Toolbar.tsx                 # acoes principais e seletor de cloud
│   ├── Sidebar.tsx                 # catalogo arrastavel de componentes
│   ├── SimulationCanvas.tsx        # wrapper do React Flow
│   ├── ComponentNode.tsx           # card visual de cada componente
│   ├── ConfigPanel.tsx             # edicao do componente selecionado
│   └── CostPanel.tsx               # painel de custo mensal
├── data/
│   ├── catalog.ts                  # defaults e icones por tipo
│   └── defaultProject.ts           # arquitetura inicial
├── engine/
│   └── simulationEngine.ts         # logica de simulacao
├── services/
│   ├── costs.ts                    # custo por cloud/componente
│   ├── importExport.ts             # import/export .din
│   └── storage.ts                  # persistencia localStorage
├── utils/
│   ├── flow.ts                     # adaptadores para nodes/edges do React Flow
│   └── format.ts                   # formatadores utilitarios
└── types.ts                        # tipos centrais do dominio
```

## Funcionalidades Implementadas
- Adicionar componentes via drag and drop:
  - Cliente
  - Balanceador
  - API Gateway
  - Cache
  - Message Queue
  - Servidor
  - Banco de Dados
- Conectar e remover componentes/conexoes no canvas.
- Selecionar componente e editar:
  - nome
  - capacidade maxima
  - throughput configurado
  - taxa de falha
  - latencia base
  - estrategia do balanceador
  - limite do API Gateway
  - taxa de cache hit
  - tamanho maximo de fila
- Duplicar componente.
- Resetar metricas de um componente ou do projeto.
- Iniciar, parar e reiniciar simulacao.
- Recalculo de custo ao alterar cloud ou parametros relevantes.

## Logica de Simulacao
- Execucao em intervalo de 1 segundo.
- Cliente gera trafego a partir do `configuredThroughput`.
- Cada no calcula:
  - entrada recebida
  - throughput entregue
  - requisicoes processadas
  - respostas com sucesso
  - falhas
  - taxa de falha
  - carga
  - latencia total acumulada
- Regras especiais implementadas:
  - `cache`: aplica hit rate e reduz latencia
  - `apiGateway`: aplica rate limit e pode rejeitar excesso
  - `messageQueue`: acumula fila e descarta excesso quando a fila enche
  - `loadBalancer`: distribui entre multiplos destinos
  - `database`: piora falhas quando sobrecarregado
- Conexoes mudam de estilo por status e animam quando ha throughput.

## Validacao Executada
- `npm run lint` -> OK
- `npm run build` -> OK
- `npm run dev -- --host 0.0.0.0 --port 4173` iniciado com sucesso durante a ultima entrega

## Arquivos Relevantes
- `README.md` documenta execucao, uso, import/export e regras principais.
- `tailwind.config.js` e `postcss.config.js` configurados.
- `dist/` presente com build de producao gerado.

## Pendencias e Riscos Atuais
### 1. Interacao interna dos nodes pode conflitar com drag do React Flow
- **Descricao**: os sliders e inputs dentro de `ComponentNode` ainda podem competir com o comportamento de arraste do node/canvas dependendo do navegador.
- **Impacto**: usabilidade ruim ao ajustar throughput ou taxa de falha direto no card.
- **Localizacao**: `src/components/ComponentNode.tsx`
- **Status**: CORRIGIDO (2026-06-04) — adicionado `onMouseDown` e `onTouchStart` com `stopPropagation()` aos inputs range

### 2. Validacao de importacao `.din` ainda e superficial
- **Descricao**: a validacao atual confere formato geral do projeto, mas nao faz validacao estrutural profunda de cada node/edge/config.
- **Impacto**: arquivo malformado pode ser aceito e causar estado inconsistente.
- **Localizacao**: `src/services/importExport.ts`
- **Status**: PENDENTE

### 3. Motor de simulacao ainda usa heuristicas simplificadas
- **Descricao**: distribuicao de trafego, fila, falhas e latencia seguem um modelo simplificado, suficiente para demonstracao visual, mas nao calibrado como simulador de infraestrutura real.
- **Impacto**: resultados servem para exploracao e comparacao qualitativa, nao para previsao operacional precisa.
- **Localizacao**: `src/engine/simulationEngine.ts`
- **Status**: CONHECIDO

## Proximas Acoes Sugeridas
1. Blindar interacoes dos controles internos do node com `nodrag`, `nopan` e `stopPropagation`.
2. Aprofundar a validacao do arquivo `.din` com schema claro.
3. Refinar a simulacao para cenarios com fan-out/fan-in mais realistas.
4. Adicionar teste manual dirigido para import/export e estados de sobrecarga.
