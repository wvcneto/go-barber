import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordService from './SendForgotPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPassword: SendForgotPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPassword = new SendForgotPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email.', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'João das Neves',
      email: 'jneves@example.com',
      password: '123456',
    });

    await sendForgotPassword.execute({
      email: 'jneves@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password using non-existing user.', async () => {
    await expect(
      sendForgotPassword.execute({
        email: 'jneves@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password.', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    sendForgotPassword = new SendForgotPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );

    const user = await fakeUsersRepository.create({
      name: 'João das Neves',
      email: 'jneves@example.com',
      password: '123456',
    });

    await sendForgotPassword.execute({
      email: 'jneves@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
