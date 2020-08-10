import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update the avatar.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeStorageProvider,
      fakeUsersRepository,
    );

    const user = await fakeUsersRepository.create({
      name: 'João das Neves',
      email: 'jneves@test.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'AvatarImage.png',
    });

    expect(user.avatar).toBe('AvatarImage.png');
  });

  it('should not be able to update the avatar from non existing user.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeStorageProvider,
      fakeUsersRepository,
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'AvatarImage.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar when updating new one.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeStorageProvider,
      fakeUsersRepository,
    );

    const user = await fakeUsersRepository.create({
      name: 'João das Neves',
      email: 'jneves@test.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'AvatarImage.png',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'SecondAvatarImage.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('AvatarImage.png');
    expect(user.avatar).toBe('SecondAvatarImage.png');
  });
});
