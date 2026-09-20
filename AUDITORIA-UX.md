# Auditoria UX/UI — Dra. Priscila Scariot

Data: 19/09/2026. Estado auditado: site local em localhost:3001, antes das correções desta rodada.

## Método e limites

Percorri a página inteira nos tamanhos 320×568, 360×800, 375×812, 390×844, 412×915, 430×932, 768×1024, 820×1180, 1366×768, 1440×900 e 1920×1080. Inspecionei o código, as posições durante a rolagem, o menu e capturas de cada bloco. Evidências iniciais: `.audit/before.json` e painéis `.audit/before-*.png`.

O detector auxiliar Impeccable não executou: motor ausente e criação do cache bloqueada. Os achados abaixo são de inspeção direta. Não é uma certificação WCAG nem uma medição de Core Web Vitals de produção: o site está no servidor de desenvolvimento, sem simulação de rede móvel.

## Diagnóstico geral

A identidade está coerente: paleta, fotografia, serifas editoriais e contraste entre papel, creme e verde pertencem ao mesmo projeto. A Hero continua sendo uma boa referência. Não há justificativa para redesenhar o site.

O maior problema funcional é tentar prender cards altos em uma janela baixa. A página também conserva CTAs provisórios de etapas anteriores. O parallax das maçãs, por outro lado, está funcionando na versão atual: a imagem muda 90 px em relação ao conteúdo em 300 px de rolagem no mobile. Não reproduzi a imagem estática descrita no briefing.

Avaliação técnica indicativa: **12/20** — acessibilidade 2/4; performance 3/4; responsividade 2/4; consistência de tokens 3/4; integridade da experiência 2/4. O agendamento sem destino pesa especialmente na integridade. Os números são uma síntese da inspeção, não resultados de Lighthouse.

## CRÍTICO

| ID | Seção / problema | Causa verificada ou provável | Impacto | Correção recomendada | Arquivo provável |
|---|---|---|---|---|---|
| C1 · P1 | Áreas: conteúdo inacessível em 320×568 | Cards de 593–726 px presos em `top:94px`; sobra de conteúdo de até 252 px abaixo da janela. Ancestrais não têm overflow/transform/filter/contain bloqueando sticky. | O próximo card cobre o anterior antes que seu fim possa ser lido. | Medir a altura natural e ajustar o limite sticky: card alto rola até revelar seu fim e então fica preso. Manter sobreposição crescente, sem scroll interno. Restaurar corpo mobile de 16 px; não reduzir texto para fazê-lo caber. | `areas-section.module.css`, componente da pilha |
| C2 · P1 | Áreas: sequência não conclui o mesmo comportamento em todos os dispositivos | Regra de altura desliga sticky em 1366×768; falta percurso final fora do mobile. O sexto card começa a sair ao atingir o topo, em vez de permanecer preso. | Experiência muda para lista ou termina abruptamente. | Usar a mesma regra de altura disponível também em telas baixas e criar percurso final dentro do contêiner para o sexto card. Preservar a composição desktop. | `areas-section.module.css`, componente da pilha |
| C3 · P1 | Identificação e manifesto: “Entender como funciona” não navega | Identificação depende de URL externa não configurada; manifesto usa destino de agendamento. Ambos mantêm avisos provisórios, embora `#como-funciona` exista. | A pessoa pede explicação e recebe uma mensagem de indisponibilidade. | Ligar os dois CTAs à seção existente, preservando seus rótulos e aparência. | `identification.tsx`, `life-manifesto.tsx` |
| C4 · P0 para publicação | Agendamento indisponível | `NEXT_PUBLIC_BOOKING_URL` não está configurada; só existe `.env.example` vazio. | Nenhum CTA de agendamento conclui a conversão. | Configurar o endereço oficial fornecido pela responsável. Não inventar WhatsApp, telefone ou URL. Pendente de informação externa. | Configuração de ambiente / `landing.tsx` |

## IMPORTANTE — recomendações, sem implementação nesta rodada

1. **Tablet / sobre:** retrato muito estreito com corte forte do rosto; o painel com recuo sobreposto reduz a coluna de texto. Rever composição e ponto focal em 768–820 px antes de alterar a foto. `about-journey.module.css`.
2. **Tablet / posicionamento clínico:** três colunas mantêm o texto em apenas 218–235 px. É legível, mas a leitura fica fragmentada e as imagens viram faixas verticais. Considerar duas zonas ou empilhamento nesse intervalo. `clinical-method.module.css`.
3. **Manifesto:** título e texto atravessam o rosto da profissional; a fotografia ocupa uma faixa vertical muito longa no celular. Melhorar composição e conferir contraste local sobre a foto. Não foi calculado um contraste WCAG por glifo nesta auditoria. `life-manifesto.module.css`.
4. **Arquitetura:** a página tem aproximadamente 26 mil px de altura no celular. Sobre, trajetória, síntese e quatro etapas repetem a mesma promessa de individualização. Rever a extensão editorial e a alternância de ritmos com aprovação de copy; preservar os fatos e a identidade.
5. **Navegação e fechamento:** “Conteúdos” e “Contato” estão indisponíveis; não há footer, FAQ nem seção de contato. Existe CTA final em Histórias reais. Planejar o fechamento com dados oficiais. Não criar novos blocos nesta rodada.
6. **Navegação contextual:** “Início” fica ativo em toda a página. “Especialidades” leva à faixa resumida, não à explicação de Áreas. Avaliar estado ativo por seção e destino mais útil. `landing.tsx`.
7. **Performance de imagens:** o fundo das maçãs usa PNG original de cerca de 2,5 MB; há também camada com Next Image para mobile. Avaliar formato otimizado e carregamento da versão adequada por dispositivo. Conferir `sizes` de imagens verticais em `cover`, especialmente Identificação. Não há evidência de que seja necessário adicionar uma biblioteca de motion.
8. **Depoimentos:** fotos preservam seus rostos e proporções; a faixa de texto embutida na arte fica pequena no celular. O nome e a categoria já aparecem em HTML. Considerar arquivos fotográficos sem texto embutido se forem disponibilizados, sem editar as fotos nesta rodada.

## POLIMENTO — não implementar agora

- Padronizar recuos: Áreas usa 16 px em telefones, enquanto outras seções usam 7%; o painel Sobre tem deslocamento próprio.
- Reduzir diferenças arbitrárias de raios (5, 7, 8, 9, 10, 12, 14, 15, 24 e 28 px) por família de componente, preservando os painéis editoriais.
- Consolidar regras repetidas de tipografia e breakpoints; há overrides ao final de vários CSS e documentação visual desatualizada sobre sticky/parallax.
- Ajustar espaços entre introduções longas, imagens e números de etapas. A numeração clara é hierarquia decorativa, não um erro de contraste de informação essencial.
- Revisar labels de 8–10 px e descrições curtas de indicadores. Não reduzir o corpo principal.
- Restringir o trabalho do parallax ao período em que a seção está próxima da viewport e evitar recalcular overscan em cada scroll quando suas dimensões não mudaram. É otimização secundária: o efeito já usa rAF, listeners passivos e cleanup.

## Leitura seção por seção

| Bloco | Resultado |
|---|---|
| Header / menu | Logo reconhecível, alvo de menu confortável, foco inicial, Escape, restauração de foco e bloqueio de scroll funcionaram. Menu cabe em 320×568 e tem rolagem própria quando necessário. |
| Hero | Identidade preservada; texto principal legível, CTAs com área de toque adequada. Em telas curtas, a foto aparece após a primeira dobra, coerente com a ordem texto → foto. |
| Faixa de especialidades | Grade 2×2 mobile íntegra; boa síntese, sem overflow. |
| Identificação | Corpo de 16 px mobile, imagem íntegra; CTA provisório é C3. |
| Uma nova perspectiva | Movimento relativo real no mobile; camada extra mantém a cobertura. Desktop continua com fundo fixo. |
| Posicionamento clínico | Ordem mobile clara; composição tablet merece revisão de leitura, sem conteúdo horizontalmente cortado nos tamanhos testados. |
| Áreas de atuação | C1/C2: altura do conteúdo e percurso final; não há ancestral bloqueando sticky. Corpo mobile reduzido a 14 px na versão auditada. |
| Manifesto | Continuidade de paleta preservada; CTA incorreto e oportunidades de composição fotográfica. |
| Sobre / trajetória / síntese | Autoridade e fotos reais reforçam confiança; narrativa longa, recuos variados e crop tablet precisam de acabamento posterior. |
| Como funciona | Timeline muda corretamente para uma coluna, com linha lateral. Quatro passos completos e sem overflow; há oportunidade de encurtar o ritmo editorial. |
| Histórias reais / CTA final | Fotos completas, nomes e categorias em HTML; muito espaço vertical, mas sem conteúdo perdido. CTA depende de C4. |
| Footer / FAQ / contato | Ainda não existem na implementação atual. Registrar como etapa futura, não defeito de uma seção implementada. |

## Testes iniciais

- Nenhuma rolagem horizontal nos onze tamanhos.
- Nenhuma exceção JavaScript capturada durante a navegação completa.
- Todos os retratos visíveis carregaram. A imagem decorativa mobile fica oculta/não carregada em algumas execuções desktop, o que não representa imagem quebrada visível.
- Sticky confirmado de 360 a 430 px; conteúdo perde acessibilidade vertical em 320×568.
- Parallax mobile confirmado por deslocamento relativo de 90 px em 300 px de scroll.
- Menu: body lock, foco em Início e retorno ao botão após Escape passaram em mobile/tablet.

## Escopo da correção autorizada

Implementar C1, C2 e C3. C4 permanece pendente do destino oficial. Preservar o parallax que passou, a Hero, as imagens, a copy e a composição desktop. Não implementar os itens Importantes e de Polimento automaticamente.

## Resultado após as correções

### Críticos corrigidos

- **C1:** corpo dos cards mobile restaurado para 16 px / entrelinha 1,65. O novo contêiner mede as alturas com ResizeObserver e usa `min(header + 12px + incremento, viewport − altura do card − 12px)` como limite sticky. Em telas curtas o topo pode ficar negativo: o usuário percorre o card inteiro antes de ele prender pelo fim. Assim, não há conteúdo permanentemente abaixo da janela nem scroll interno. Cards que cabem prendem abaixo do header; os próximos continuam subindo sobre os anteriores.
- **C2:** removida a regra que transformava a pilha em lista nas telas desktop baixas. O percurso final de 35svh agora existe em todos os tamanhos para o sexto card permanecer preso. Os espaços entre cards continuam em 24svh no mobile e 15svh no desktop. Z-index cresce pelo índice; o limite preferido tem incremento zero no mobile e 12 px no desktop. O cálculo de tamanho não executa em cada scroll.
- **C3:** ambos os CTAs levam a `#como-funciona`, com link real, suporte a cliques modificados, transferência de foco e preferência de movimento reduzido. A lógica de navegação é compartilhada.

**Parallax:** não foi reimplementado nesta rodada, pois passou no diagnóstico e na regressão. No mobile a imagem se move a 70% da velocidade da página; o deslocamento relativo medido foi de 90 px em 300 px de scroll, com cobertura contínua do fundo. Desktop preserva `background-attachment: fixed`. Reduced motion desativa a transformação.

### Arquivos de aplicação alterados

1. `src/components/adaptive-card-stack.tsx` — novo contêiner com medição de alturas e cleanup.
2. `src/components/areas-section.tsx` — uso do contêiner mantendo os cards renderizados pelo servidor.
3. `src/components/areas-section.module.css` — sticky adaptável, percurso final, corpo mobile confortável.
4. `src/components/section-link.tsx` — novo link interno reutilizável com foco acessível.
5. `src/components/identification.tsx` — destino do CTA corrigido.
6. `src/components/life-manifesto.tsx` — destino do CTA corrigido.

O restante da aplicação, incluindo Hero, textos e imagens, foi preservado. Este relatório e os scripts/resultados em `.audit/` são artefatos de validação.

### Validação final

| Verificação | Resultado |
|---|---|
| Navegação completa nos onze tamanhos do briefing | Sem overflow horizontal e sem exceções JavaScript |
| Cards nos onze tamanhos | Sticky ativo; fundo de cada card fica dentro da viewport quando preso |
| Sequência progressiva, incluindo sexto card | Passou em Chromium e WebKit em 320×568, 390×844, 820×1180 e 1440×900 |
| Sobreposição | Próximo card identificado à frente por hit-testing durante a entrada; atual permanece preso |
| Parallax mobile | 90 px de movimento relativo em 300 px de scroll nos seis tamanhos mobile; confirmado também em WebKit |
| Desktop / tablet | Composição preservada; mídia mobile oculta e background fixo mantido |
| CTAs “como funciona” | Ambos chegaram à seção, inclusive em navegação repetida, nos dois motores |
| Reduced motion | Transformação do parallax desligada nos testes dos dois motores |
| Menu | Foco inicial, Escape, restauração de foco e bloqueio de scroll passaram nos tamanhos mobile/tablet |
| `node node_modules/typescript/bin/tsc --noEmit` | Passou |
| `node node_modules/next/dist/bin/next build` | Passou; rota inicial prerenderizada |

Evidências: `.audit/after.json`, `.audit/interactions.json`, `.audit/console.json` e painéis `.audit/after-*.png`. O teste de cliques aguarda a animação de entrada terminar; a primeira versão do teste tentou clicar durante essa transição e foi ajustada. WebKit é emulação automatizada, não validação em um iPhone físico.

### Pendências finais

- **C4:** falta a URL oficial de agendamento. Ela foi solicitada durante o trabalho; nenhum destino foi inventado ou configurado.
- O console não apresentou exceções de aplicação, mas o navegador solicitou `/favicon.ico`, que retornou **404**. É um item de polimento/publicação, não um bloqueio da navegação; não foi alterado nesta rodada restrita aos críticos.
- Os itens Importantes e de Polimento acima permanecem recomendações. Não foram implementados redesign, normalização global de tokens, mudanças de copy, novas seções ou troca de fotos.
- CLS, métricas de campo e performance com rede móvel devem ser medidos em produção. Não foram declarados aprovados com base no servidor de desenvolvimento.
