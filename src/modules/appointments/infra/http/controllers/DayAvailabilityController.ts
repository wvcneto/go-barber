import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListDayAvailabilityService from '@modules/appointments/services/ListDayAvailabilityService';

export default class DayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month, day } = request.body;

    const listDayAvailability = container.resolve(ListDayAvailabilityService);

    const dayAvailability = await listDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(dayAvailability);
  }
}
