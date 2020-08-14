import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindInAllMonthFromProviderDTO from '../dtos/IFindInAllMonthFromProviderDTO';
import IFindInAllDayFromProviderDTO from '../dtos/IFindInAllDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindInAllMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindInAllDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
