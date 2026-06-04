# Diretrizes para Agentes — Simulador de Arquitetura de Servidores

## Protocolo de trabalho obrigatório

Todo agente que trabalhar neste projeto deve seguir este protocolo após alterações:

1. **Carregar estado**: Ler `projects_memory.md` para entender contexto e status
2. **Fazer mudanças**: Implementar conforme solicitado
3. **Atualizar memory**: Modificar `projects_memory.md` para refletir novo estado
4. **Commitear**: Usar mensagens claras e contextualizadas
5. **Fazer push**: Para a branch remota (padrão: `main`)

**Executar em cada interação**, sem exceção.

## Informações do repositório

- **URL**: `https://github.com/lucasagon/web-server-simulator`
- **Autenticação**: SSH (preferido) ou HTTPS
- **Branch padrão**: `main`
- **Email do usuário**: `lucastikon@gmail.com`

Sempre confirme com o usuário antes de fazer push.

## Padrão de mensagens de commit

```
Verbo no imperativo: descrição clara

Contexto e impacto técnico quando relevante

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

Exemplos:
- `Corrigir propagação de eventos em inputs range do ComponentNode`
- `Adicionar validação de importação de arquivos .din`
- `Refatorar simulationEngine para distribuição mais realista de tráfego`

Evite mensagens genéricas ou sem contexto técnico.

## Diretrizes de código e documentação

Código deve parecer escrito por um desenvolvedor real, não gerado automaticamente.

### Tom e estrutura

- Técnico e claro, sem linguagem corporativa exagerada
- Contexto → Decisão → Motivo → Consequência
- Trade-offs e limitações explicitadas
- Comentários úteis (nunca óbvios)
- Nomes claros em função, variável, classe e módulo

### O que evitar

- Frases genéricas: "solução robusta, escalável e eficiente"
- Repetição mecânica de estrutura de parágrafo
- Justificativas que servem para qualquer projeto
- Parágrafos perfeitamente simétricos
- Comentários que apenas repetem o código

### O que perseguir

- Decisões justificadas com contexto real
- Limitações conhecidas documentadas
- Pequenos detalhes de execução e manutenção
- Código que fala por si, comentários que explicam **por quê**

## Memory: snapshot do estado

`projects_memory.md` é o registro vivo do projeto. Deve incluir:

- Funcionalidades implementadas e status
- Stack tecnológico com versões
- Issues e bugs abertos (com descrição e localização)
- Validações executadas recentemente
- Próximas ações sugeridas

Atualize sempre que fizer alteração significativa.

## Antes de mergear

Checklist obrigatório:

- ✅ Código revisado (sem lógica óbvia, sem comentários redundantes)
- ✅ Documentação sincronizada com implementação
- ✅ Commit message clara e contextualizada
- ✅ Memory atualizado com novo estado
- ✅ Sem credenciais, tokens ou dados sensíveis
- ✅ `.env` no `.gitignore`, `.env.example` presente
- ✅ Mudanças testadas na interface (para mudanças UI/UX)

## Referências

- Guia de humanização: `/mnt/d/_Projects/ai_brain/prompts/auditoria_projeto_humanizado.md`
- Perfil de escrita: `/mnt/d/_Projects/ai_brain/prompts/perfil_escrita_lucas.md`
- README do projeto: `./README.md`

---

**Última atualização**: 2026-06-04
**Responsável**: Lucas Agon
