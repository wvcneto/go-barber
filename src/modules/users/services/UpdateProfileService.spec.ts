import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João das Neves',
      email: 'jneves@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Maria das Rosas',
      email: 'mroses@example.com',
    });

    expect(updatedUser.name).toBe('Maria das Rosas');
    expect(updatedUser.email).toBe('mroses@example.com');
  });

  it('should not be able to update the email with another user email.', async () => {
    await fakeUsersRepository.create({
      name: 'João das Neves',
      email: 'jneves@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Maria das Rosas',
      email: 'mrosas@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Maria das Rosas',
        email: 'jneves@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João das Neves',
      email: 'jneves@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'João das Neves',
      email: 'jneves@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João das Neves',
      email: 'jneves@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'João das Neves',
        email: 'jneves@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'João das Neves',
      email: 'jneves@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'João das Neves',
        email: 'jneves@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
