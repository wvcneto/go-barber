import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

// SoC: Separation of Concerns (Separação de Preucupações)
// DTO: Data Transfer Object
// Rota: Receber requisição, chamar arquivo de regra do negocio e devolver a resposta

/*
appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});
*/

// http://localhost:3333/appointments

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
