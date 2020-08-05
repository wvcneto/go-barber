import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

/**
 * [x]Receber informações
 * [x]Tratativa de Erros e Excessoẽs
 * [x]Acesso ao Repositório
 */

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

// [x]Dependency Inversion (SOLID) - S/D
// [x]DRY: Don't Repeat Yourself

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
