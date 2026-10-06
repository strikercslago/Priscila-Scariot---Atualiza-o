# SEO técnico — Priscila Scariot

Auditoria e validação em 06/10/2026. Alterações preparadas localmente; nenhum deploy foi realizado.

## Projeto e publicação

- Next.js 16.3.5 (versão dos lockfiles), App Router em `src/app`, React 19.3.0, TypeScript, Tailwind CSS 4 e CSS Modules.
- Única página pública implementada: `/`. Os destinos `#inicio`, `#sobre`, `#especialidades`, `#como-funciona` e demais seções são âncoras da Home.
- `/projeto-verao` aparece somente numa condição do botão WhatsApp; não existe uma página dessa rota. Retornou 404 localmente e no domínio oficial, por isso não entrou no sitemap.
- Script de produção: `npm run build` → `next build`. Saída/publish directory: `.next`. Não há configuração de exportação estática nem pasta de publicação `out`.
- O domínio respondeu com `Server: Netlify`. Não existem `netlify.toml`, `_redirects`, `_headers`, middleware, proxy, configuração Next personalizada ou pipeline de deploy nesta cópia. Não há diretório `.git` para identificar o repositório/branch de publicação.
- O adaptador automático do Netlify suporta o App Router e as rotas de metadados. Nenhuma regra de publicação, redirect ou header foi adicionada ou removida. Build command, branch, variáveis, publish directory e eventuais regras no painel precisam ser conferidos no Netlify: não estão disponíveis nesta cópia.

Referências: [configuração Next.js no Netlify](https://docs.netlify.com/snippets/frameworks/nextjs-config-values/) e [adaptador Next.js](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/). As APIs foram conferidas também na documentação da versão instalada em `node_modules/next/dist/docs/` antes de editar o código.

## Arquivos

Criados:

- `src/lib/seo.ts`: domínio oficial, title, descrição, imagem social e dados estruturados.
- `src/app/sitemap.ts`: gera `/sitemap.xml` no build.
- `src/app/robots.ts`: gera `/robots.txt` no build.
- `AUDITORIA-SEO.md`: este relatório.

Alterados:

- `src/app/layout.tsx`: title e descrição.
- `src/app/page.tsx`: canonical exclusivo da Home, Open Graph, Twitter Card e JSON-LD renderizado no servidor.

Nenhum componente visual, CSS, imagem, fonte, biblioteca ou texto visível foi alterado. Os hashes dos arquivos existentes de `src` e `public` confirmaram alterações somente em `layout.tsx` e `page.tsx`. Evidências e scripts de verificação locais ficam em `.audit/seo/`, pasta já ignorada pelo projeto.

## Metadados finais

- **Title:** Priscila Scariot | Nutricionista em Passo Fundo - RS
- **Description:** Dra. Priscila Scariot, nutricionista em Passo Fundo - RS. Acompanhamento personalizado para emagrecimento, saúde metabólica e saúde da mulher. Consultas presenciais e online.
- **Canonical:** https://nutripriscilascariot.com.br/
- **H1 preservado:** Nutrição para transformar sua saúde sem transformar sua vida em uma dieta.
- **Sitemap:** https://nutripriscilascariot.com.br/sitemap.xml
- **Robots:** https://nutripriscilascariot.com.br/robots.txt
- **Única URL no sitemap:** https://nutripriscilascariot.com.br/

Sitemap com namespace XML correto, sem âncoras, páginas inexistentes ou datas de atualização inventadas. Robots permite `/` para todos os agentes e anuncia o sitemap; CSS, JS e imagens não são bloqueados.

Open Graph inclui title, description, URL absoluta, `website`, `pt_BR`, nome do site e a fotografia existente `hero-original.png` (1672 × 941), com alt. Twitter Card usa `summary_large_image`, a mesma descrição e fotografia. Nenhum perfil social foi inventado. A fotografia e a logo responderam HTTP 200 no domínio oficial.

## Semântica e SEO local

- HTML com `lang="pt-BR"`, charset UTF-8 e viewport responsivo, confirmados no HTML de produção.
- Hierarquia renderizada: 1 H1, 15 H2, 31 H3 e 4 H4. As seções e seus subtítulos usam a hierarquia existente. Não foi inserido H1 adicional, texto oculto ou rótulo artificial substituindo o título visual.
- Nome da profissional, nutrição, modalidades presencial/online e endereço em Passo Fundo já constam no conteúdo. A localização foi reforçada nos metadados e no JSON-LD sem alterar a hero.
- Todas as 40 imagens renderizadas possuem atributo alt. Retratos, logo, fotografias clínicas e depoimentos têm descrições existentes; ornamentos e imagens complementares em quatro cartões mantêm `alt=""`, com o assunto já expresso no texto adjacente. Nenhuma palavra-chave foi acrescentada artificialmente ao alt.
- Conteúdo principal, endereço e JSON-LD chegam no HTML inicial, inclusive em requisição com User-Agent Googlebot. O texto está no DOM mesmo sem executar JavaScript; algumas revelações visuais continuam dependendo do JavaScript das animações existentes.

## Dados estruturados

JSON-LD com grafo de `Person` e `MedicalBusiness` (subtipo de `LocalBusiness`), relacionado por `worksFor`. [MedicalBusiness](https://schema.org/MedicalBusiness) contempla negócios de profissionais da saúde; não foi usado `Physician` para classificar uma nutricionista.

- Person: Priscila Scariot, prefixo Dra., profissão Nutricionista, URL e fotografia existentes.
- Consultório: Priscila Scariot Nutrição, domínio oficial, logo e fotografia existentes, descrição do atendimento, endereço e área local atendida.
- Endereço transcrito de `location-section.tsx`: Clinical Center, R. Uruguai, 1969 - Sala 201, Centro, Passo Fundo, RS, CEP 99010-111, Brasil.
- Área local: Passo Fundo, contida no estado Rio Grande do Sul. Não se presumiu cobertura nacional para atendimento online.
- Telefone: usa a mesma variável `NEXT_PUBLIC_WHATSAPP_NUMBER`, fallback e normalização do botão existente. Sem variável, o valor existente é `+555499283530`; não foi corrigido ou completado por suposição.
- Nenhum CRN, horário, rede social, preço, coordenada, avaliação, `Review` ou `AggregateRating` foi acrescentado.
- JSON serializado com escape de `<`, conforme a documentação instalada do Next.js.

## Testes concluídos

Build de produção executado com `node node_modules/next/dist/bin/next build`, equivalente ao `next build` do script do projeto. Compilação, TypeScript e geração estática aprovados. Rotas geradas: `/`, `/robots.txt`, `/sitemap.xml` e a página interna de erro do Next.js.

Servidor de produção iniciado com `next start` na porta local 3100. Resultados:

| Verificação | Resultado local |
| --- | --- |
| Home | HTTP 200, HTML |
| Sitemap | HTTP 200, application/xml; XML parseado e uma URL válida |
| Robots | HTTP 200, text/plain; Allow: / e sitemap oficial |
| Canonical | Exatamente https://nutripriscilascariot.com.br/ |
| Indexação da Home | index, follow; sem noindex ou X-Robots-Tag bloqueador |
| Googlebot | HTTP 200; conteúdo e JSON-LD presentes |
| Rotas inexistentes | HTTP 404 real |
| Âncoras internas | Todos os destinos existentes |
| Recursos locais solicitados pelo navegador | Nenhuma resposta 4xx/5xx |
| JavaScript da página | Nenhum erro de execução nos testes |
| Menu mobile | Abre e fecha com Escape |
| Agendamento sem variável local | Exibe o aviso existente, preservando o comportamento |
| WhatsApp | Link existente preservado; nenhuma mensagem enviada |
| HTML do body sem scripts | Idêntico ao build anterior |
| Capturas completas desktop 1440px e mobile 390px | Comparação final com zero pixels diferentes |

Capturas antes/depois feitas com preferência de movimento reduzido para comparação estável, após percorrer toda a página e carregar os recursos. Também houve teste com movimentos habilitados, sem erro de execução. O iframe externo do Google Maps foi excluído das capturas automatizadas; seu componente e sua URL ficaram intactos. Não foi feita medição de Core Web Vitals em campo nem validação da entrega de mensagens/consultas em serviços externos.

## Observações de performance e ambiente

- Hero já usa WebP de aproximadamente 97 KB; as imagens responsivas WebP das áreas variam de cerca de 66 a 190 KB. Fontes são locais e fotos usam otimização do Next.js ou carregamento lazy.
- Fundos PNG existentes: `transition-apples.png` ≈ 2,54 MB e `life-manifesto-consultation.png` ≈ 1,75 MB. São oportunidades de otimização futura; permaneceram intactos para preservar os assets e a aparência solicitados.
- Não foram encontrados links internos quebrados ou recursos locais com 404 na navegação testada. Links externos de mapas e WhatsApp dependem dos respectivos serviços.
- A instalação manteve as versões dos lockfiles. O pnpm disponível neste ambiente informou scripts ignorados do sharp porque o `pnpm-workspace.yaml` existente contém `sharp: set this to true or false`. O binário pré-compilado do sharp funcionou e o build de produção direto passou. Esse arquivo foi preservado; se o Netlify usar pnpm com a mesma política, será necessário resolver essa configuração de instalação conforme o log do deploy. Não houve troca de gerenciador ou biblioteca.

## Publicação e ações externas pendentes

Na verificação pública anterior ao deploy: Home HTTP 200; `/sitemap.xml` e `/robots.txt` HTTP 404. Isso confirma que os endpoints ainda não existem na versão publicada. Os HTTP 200 acima referem-se ao novo build local.

1. Publicar estes arquivos pelo fluxo existente do Netlify. Conferir o script `next build`, publish directory `.next`, adaptador automático e variáveis já usadas em produção, especialmente `NEXT_PUBLIC_BOOKING_URL` e `NEXT_PUBLIC_WHATSAPP_NUMBER`.
2. Conferir após o deploy os dois endpoints oficiais: HTTP 200, XML/texto corretos, sem página HTML de erro ou rewrite genérico. Revisar regras do painel somente se houver interferência.
3. Enviar `https://nutripriscilascariot.com.br/sitemap.xml` no Search Console e inspecionar novamente a Home. O processamento e novo rastreamento dependem do Google.
4. Validar a URL publicada no Rich Results Test/Schema Markup Validator. O JSON e os tipos foram verificados localmente; não foi submetido um teste externo da versão ainda não publicada.
5. Conferir com a responsável o telefone já cadastrado e manter nome/endereço/telefone consistentes com o Perfil da Empresa no Google. Não houve alteração desse perfil nem confirmação de acesso à conta.

Não é necessário inventar novas páginas para aumentar o sitemap. Quando uma nova rota pública for implementada, adicionar sua URL real ao sitemap e configurar seu próprio canonical e metadados.
