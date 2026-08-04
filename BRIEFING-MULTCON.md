# Briefing do projeto Multcon

## Visão geral

A plataforma se chama **Multcon** e pertence à empresa **Multiplic Seguros**.

O objetivo é criar uma aplicação web para aquisição de clientes interessados em consórcio, com foco em simulação rápida, captação de leads e criação de uma área para afiliados/influenciadores.

## Marca e identidade

- **Empresa:** Multiplic Seguros
- **Produto/site:** Multcon
- **Referência de experiência:** mycon.com.br
- **Direção visual:** moderna, confiável, mobile first e orientada à conversão
- **Assets obrigatórios:**
  - Usar as logos disponíveis na pasta `Logo/`
  - Usar o pattern azul disponível em `Logo/Pattern/`, especialmente como fundo ou elemento visual da landing page

A comunicação pode usar a hierarquia:

> Multcon, uma plataforma da Multiplic Seguros.

## Stack e publicação

- A aplicação deve ser feita em **Next.js**
- Deve ser publicada na **Vercel**
- A experiência deve ser **mobile first**
- A página inicial deve ser rápida, clara e focada em conversão

## Página inicial / landing page

A landing page deve ser inspirada no fluxo do **mycon.com.br**, principalmente pela simplicidade, objetividade e presença do simulador logo no início da jornada.

Não deve ser uma cópia visual direta, mas deve seguir a lógica:

1. O usuário entra na página.
2. Entende rapidamente a proposta.
3. Simula o consórcio ainda na primeira dobra.
4. Deixa seus dados para receber atendimento ou proposta.

### Hero section

O simulador deve estar na **hero section**, acima da dobra.

Elementos desejados:

- Logo da Multiplic Seguros/Multcon
- Título forte sobre simular consórcio
- Subtítulo explicando que a simulação usa as tabelas vigentes da Porto Seguro
- Simulador direto e simples
- CTA principal para iniciar/ver simulação

Exemplo de mensagem:

> Simule seu consórcio com a Multcon.
> Encontre uma opção baseada nas tabelas vigentes da Porto Seguro e receba uma proposta personalizada.

## Simulador

O simulador deve ser baseado nas **tabelas da Porto Seguro do mês vigente**.

Campos iniciais sugeridos:

- Tipo de consórcio
- Valor da carta
- Prazo desejado ou parcela desejada
- Nome
- WhatsApp

O resultado deve mostrar opções estimadas de consórcio e direcionar o usuário para atendimento.

Importante: a comunicação deve deixar claro que os valores são estimativas e podem variar conforme a tabela vigente, regras comerciais e análise da administradora.

## Página de afiliado / influencer

A plataforma deve ter uma página específica para afiliados/influenciadores.

A primeira etapa deve ser uma **landing page de parceria**, apresentando as partes principais do contrato de maneira simples, visual e interativa. Essa página deve explicar a proposta comercial antes de exigir cadastro ou login.

Ideia central:

> O afiliado indica seguidores usando um cupom ou link exclusivo. Quando um seguidor contrata um consórcio pela Multcon, o afiliado pode receber aproximadamente 1% do valor do consórcio contratado, conforme regras da campanha, validação da venda e contrato de parceria.

### Fluxo do afiliado

1. Acessar a landing page de afiliados
2. Ver um resumo interativo das principais regras contratuais
3. Clicar em **Assinar contrato**
4. Fazer login usando **Google**
5. Visualizar o contrato real em **PDF**
6. Clicar novamente em **Assinar contrato**
7. Registrar a assinatura do contrato
8. Receber um e-mail confirmando a assinatura
9. Acessar a área do afiliado
10. Criar ou receber um cupom exclusivo
11. Gerar link de afiliado
12. Acompanhar indicações/leads
13. Acompanhar contratos fechados
14. Acompanhar comissões

### Landing page de afiliados

A landing page de afiliados deve funcionar como uma apresentação clara da parceria, antes do contrato formal.

Conteúdos sugeridos:

- Quem são as partes: Multiplic Seguros/Multcon e afiliado/influenciador
- Como funciona a indicação
- Como funciona o cupom/link exclusivo
- Quando a comissão é considerada válida
- Estimativa de comissão em torno de 1%
- Condições para pagamento
- Aviso de que a assinatura formal acontece no contrato em PDF

O botão principal dessa página deve ser:

> Assinar contrato

Ao clicar, o usuário deve ser direcionado para autenticação com Google.

### Login e assinatura do contrato

O login deve ser feito usando **Google**.

Após autenticação, o usuário deve visualizar o contrato real em PDF. Essa etapa deve ser separada da landing page, pois a landing apresenta apenas um resumo comercial.

Na tela do PDF, deve existir um novo botão:

> Assinar contrato

Ao clicar nesse segundo botão, o sistema deve registrar a assinatura do contrato para o usuário autenticado.

Após a assinatura:

- O contrato deve ser marcado como assinado
- O usuário deve receber um e-mail de confirmação
- O envio do e-mail deve ser feito pela plataforma **Resend**
- O usuário deve ser liberado para acessar ou continuar a configuração da área de afiliado

## Contrato genérico breve para afiliados

Este contrato deve servir como base inicial e poderá ser transformado em PDF na aplicação.

> **Contrato de Parceria Comercial para Indicação de Consórcios**
>
> Pelo presente instrumento, de um lado, **Multiplic Seguros**, responsável pela plataforma **Multcon**, e, de outro lado, o afiliado cadastrado na plataforma, ajustam uma parceria comercial para indicação de interessados em contratar consórcios.
>
> O afiliado poderá divulgar a Multcon por meio de link, cupom ou outros materiais autorizados, direcionando seus seguidores, contatos ou audiência para simulação e contratação de consórcios.
>
> A comissão do afiliado poderá corresponder a aproximadamente 1% do valor do consórcio contratado pelo indicado, desde que a contratação seja efetivamente concluída, validada e reconhecida pela Multiplic Seguros, conforme regras comerciais vigentes.
>
> A comissão somente será devida após confirmação da contratação, validação dos dados do cliente indicado e cumprimento das condições comerciais aplicáveis. Simulações, leads não convertidos, contratos cancelados ou propostas não efetivadas não geram direito automático à comissão.
>
> O afiliado declara estar ciente de que não representa legalmente a Multiplic Seguros, não podendo assumir obrigações, prometer aprovação, garantir condições comerciais ou falar em nome da empresa sem autorização expressa.
>
> A Multiplic Seguros poderá revisar, suspender ou encerrar a parceria em caso de uso indevido da marca, divulgação enganosa, fraude, descumprimento das regras comerciais ou qualquer conduta que prejudique a empresa, seus clientes ou parceiros.
>
> Ao assinar eletronicamente este contrato, o afiliado declara que leu, compreendeu e aceitou as condições da parceria comercial com a Multiplic Seguros por meio da plataforma Multcon.
>
> **Assinatura eletrônica:** realizada por meio da conta autenticada do afiliado.
>
> **Confirmação:** enviada por e-mail após a assinatura.

## Cuidados comerciais e jurídicos

A comissão não deve ser apresentada como promessa absoluta sem validação jurídica/comercial.

Usar termos como:

- "aproximadamente 1%"
- "em torno de 1%"
- "conforme contrato de parceria"
- "após validação da contratação"
- "sujeito às regras da campanha"

## Prioridade do MVP

A prioridade inicial deve ser:

1. Landing page mobile first
2. Simulador na hero
3. Captação de lead
4. Uso correto das logos e do pattern azul
5. Landing page de afiliados com resumo interativo da parceria
6. Login com Google para assinatura do contrato
7. Contrato em PDF com assinatura eletrônica
8. E-mail de confirmação via Resend
