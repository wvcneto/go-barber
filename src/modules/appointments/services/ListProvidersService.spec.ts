import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should not be able to list the providers.', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'João das Neves',
      email: 'jneves@example.com',
      password: '123456',
    });

    const user1 = await fakeUsersRepository.create({
      name: 'José das Couves',
      email: 'jcouves@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Maria das Rosas',
      email: 'mrosas@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
