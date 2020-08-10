# Recuperar Senha
  **Requisitos Funcionais**
  - O usuário deve poder recuperar sua senha informando o seu email.
  - O usuário deve receber um email com instruções de recuperação de senha.
  - O usuário deve poder resetar sua senha.
  **Requisitos Não Funcionais**
  - Utilizar Mailtrap para testar envio de email em ambiente de desenvolvimento.
  - Utilizar o Amazon SES para envios em produção.
  - O envio de email deve acontecer em segundo plano. (background job)
  **Regras de Negócio**
  - O link enviado por email para resetar senha, deve expirar em 2h.
  - O usuário precisa confirmar a nova senha ao realizar o reset de senha.

# Atualização do Pefil
  **Requisitos Funcionais**
  - O usuári odeve poder atualizar o seu perfil(nome, email, avatar e senha).
  **Requisitos Não Funcionais**
  -
  **Regras de Negócio**
  - O usuário não pode alterar o seu email para um email já utilizado.
  - Para atualizar sua senha, o usuário deve informar a senha antiga.
  - Para atualizar sua senha, o usário deve confirmar a nova senha.

# Agendamento de Serviços
  **Requisitos Funcionais**
  - O usuário deve poder listar todos prestadores de serviço cadastrados.
  - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador.
  - O usuário deve poder listar horários disponíveis em um dia específico de um prestador.
  - O usuário deve poder realizar um agendamento com um prestador.
  **Requisitos Não Funcionais**
  - A listagem de prestadores deve ser armazenado em cache.
  **Regras de Negócio**
  - Cada agendamento deve durar 1h exatamente.
  - Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro às 8h, último às 17h)
  - O usuário não pode agendar um horário já ocupado.
  - O usuário não pode agendar em um horário que já passou.
  - O usuário não pode agendar serviço consigo mesmo.

# Painel do Prestador
  **Requisitos Funcionais**
  - O usurário deve poder listar seus agendamentos em um dia específico.
  - O prestador deve receber uma notificação sempre que houver um novo agendamento.
  - O prestador deve poder visualizar as notificações não lidas.
  **Requisitos Não Funcionais**
  - Os agendamentos do prestador no dia devem ser armazenados em cache.
  - Os notificações do prestador devem ser armazenados no MongoDB.
  - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io.
  **Regras de Negócio**
  - A notificação deve ter um status de lida ou não-lida para que o prestador possa ter controle.
