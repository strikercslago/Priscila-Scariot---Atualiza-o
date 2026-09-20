# Priscila Scariot — primeira dobra

Next.js App Router, TypeScript e Tailwind CSS. Componentes em `src/components/landing.tsx`; estilos em `src/app/globals.css`.

## Executar
`npm install` e `npm run dev`. Produção: `npm run build` e `npm start`.

## Agendamento
Copie `.env.example` para `.env.local` e defina `NEXT_PUBLIC_BOOKING_URL` com o link oficial. Sem esse dado, os CTAs exibem uma mensagem de indisponibilidade e não enviam informações. Os itens do menu de seções ainda não implementadas ficam indisponíveis; Início e Especialidades já funcionam.

## Assets
Segunda seção em `src/components/identification.tsx`, com estilos isolados em CSS Module e Cormorant Garamond local. Reutiliza a fotografia fornecida em enquadramento vertical via CSS. Defina `NEXT_PUBLIC_HOW_IT_WORKS_URL` para conectar “Entender como funciona” à página oficial de acompanhamento; enquanto esse destino não existe, o botão informa sua disponibilidade futura.

Foto e logo originais enviadas pelo usuário em `public`. `hero.webp` é uma otimização da foto. A logo original é enquadrada com CSS, preservando integralmente o arquivo. Fontes locais via Fontsource. Hero com next/image, preload, sizes e placeholder blur. Nenhum serviço externo de fontes.

