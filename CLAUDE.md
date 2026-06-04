# Diretrizes para Claude — Simulador de Arquitetura de Servidores

## Fluxo obrigatório após alterações

Você precisafollow um fluxo rigoroso após cada iteração:

1. **Ler `projects_memory.md`** para verificar o estado atual do projeto.
2. **Fazer alterações** no código conforme solicitado.
3. **Atualizar `projects_memory.md`** refletindo o novo estado (snapshot completo).
4. **Fazer commit** das mudanças com mensagem clara.
5. **Fazer push** para a branch remota.

Execute esse fluxo **em cada interação com o usuário**. Não faça commit sem antes validar o estado no memory.

## Repositório e autenticação

Repositório: `https://github.com/lucasagon/web-server-simulator`
- Usar autenticação SSH quando disponível
- Branch padrão: `main`

Ao iniciar trabalho, confirme com o usuário:
- URL e tipo de autenticação (SSH ou HTTPS)
- Branch alvo para commit/push
- Qualquer contexto de release ou merge freeze

## Mensagens de commit

Mensagens de commit devem seguir este padrão:

```
Assunto: descrição clara da mudança em presente

Descrição (quando aplicável):
- Contexto do problema
- Solução implementada
- Impacto técnico

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

Exemplos bons:
- `Corrigir propagação de eventos nos sliders do componente`
- `Adicionar stopPropagation em inputs range para evitar arraste involuntário do canvas`

Evitar: mensagens genéricas, sem contexto ou sem referência à mudança real.

## Qualidade de documentação

Siga as diretrizes de tom e autoria descritas em `/mnt/d/_Projects/ai_brain/prompts/`:
- `auditoria_projeto_humanizado.md` para estrutura e tom geral
- `perfil_escrita_lucas.md` para estilo específico

### Princípios de escrita

- **Tom técnico mas próximo**: explique como um engenheiro falando com um colega.
- **Contexto antes de solução**: sempre apresente por que algo foi feito.
- **Variação natural de linguagem**: não repita a mesma estrutura de frase.
- **Trade-offs e limitações**: seja honesto sobre as escolhas.
- **Clareza e coerência**: código e documentação devem estar sincronizados.

Evite:
- Frases genéricas como "solução robusta e escalável"
- Repetição mecânica: "Eu escolhi...", "Eu escolhi...", "Eu escolhi..."
- Parágrafos com cadência idêntica
- Tom excessivamente corporativo ou promocional

## Memory e snapshot

Mantenha `projects_memory.md` como um snapshot living do estado do projeto.

Inclua:
- Estado atual das funcionalidades
- Stack e versões utilizadas
- Issues abertos e seus status
- Validações executadas recentemente
- Próximas ações sugeridas

Atualize esse arquivo **após cada mudança significativa**.

## Antes de publicar / mergear

Verifique:
- ✅ Código sem comentários óbvios demais
- ✅ Documentação sincronizada com implementação
- ✅ Mensagens de commit claras e contextualizadas
- ✅ Memory atualizado com novo estado
- ✅ Sem credenciais expostas
- ✅ `.env` protegido e `.env.example` presente

## Referências

- Guia completo de humanização: `/mnt/d/_Projects/ai_brain/prompts/auditoria_projeto_humanizado.md`
- Estilo de escrita: `/mnt/d/_Projects/ai_brain/prompts/perfil_escrita_lucas.md`
- README do projeto: `./README.md`
