import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import { randomUUID } from "crypto";
import mailService from "./mail.service";
import tokenService from "./token.service";
import UserDto from "../dtos/user.dto";
import ApiError from "../exceptions/api.error";

const API_URL: string = process.env.API_URL || '';

if(!API_URL) {
  throw new Error('API_URL is not imported from .env');
}

class UserService {

  async registration (email: string, password: string) {

    // Проверка, есть ли пользователь с таким email в бд
    const candidate = await User.findOne({email})

    if(candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует.`);
    }

    // Создание хеш пароля и ссылки для активации аккаунта
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = randomUUID();

    // Создание пользователя
    const user = await User.create({email, password: hashPassword, activationLink});
    // Отправка письма для активации на email пользователя
    // TODO: доделать email
    // await mailService.sendActivationMail(email, `${API_URL}/api/activate/${activationLink}`);

    // Создание объекта пользователя для возврата его в api
    const userDto = new UserDto(user);
    // Генерация JWT токенов
    const tokens = await tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    const returnUser = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userDto,
    }

    return returnUser;
  };

  async activate (activationLink: string ) {
    const user = await User.findOne({activationLink});

    if(!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }

    user.isActivated = true;
    await user.save();
  };

  async login (email: string, password: string) {
    const user = await User.findOne({ email });

    if(!user) {
      throw ApiError.BadRequest(`Пользователь с таким email не найден`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
        throw ApiError.BadRequest('Неверный пароль');
    }

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    const returnUser = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userDto,
    }

    return returnUser;
  };

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  };

  async refresh (refreshToken: string) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    // Валидация токенов
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if(!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findById(tokenFromDb.user?._id);
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    const returnUser = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userDto,
    }

    return returnUser;
  };

  async getAllUsers () {
    const users = await User.find();
    return users;
  };

  async getUser (id: string) {
    const user = await User.findById(id);
    return user;
  }
}

export default new UserService();