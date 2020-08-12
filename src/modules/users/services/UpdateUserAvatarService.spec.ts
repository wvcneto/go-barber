import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeStorageProvider,
      fakeUsersRepository,
    );
  });
  it('should be able to update the avatar.', async () => {
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
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'AvatarImage.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar when updating new one.', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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
