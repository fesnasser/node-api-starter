import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { UserRequest } from './userRequest.http';
import { Controller, Delete, Get, Post } from '../../http/router';
import { Inject, Service } from 'typedi';
import { UserEntity } from './user.entity';
import { USER_REPOSITORY_TOKEN } from './user.repository';
import { IRepository } from '../../common/repository.interface';

@Controller('/users')
@Service()
export default class UserController {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: IRepository<UserEntity>,
  ) {
    this.userRepository = userRepository;
  }

  @Get('/')
  async getAll(_: Request, res: Response): Promise<void> {
    const response = await this.userRepository.getAll();

    res.status(200).json(response);
  }

  @Get('/:id')
  async getOne(req: Request, res: Response): Promise<void> {
    const userReq = plainToClass(UserRequest, req.params);
    const response = await this.userRepository.getOne(userReq.id);

    response ? res.status(200).json(response) : res.status(404).json();
  }

  @Post('/')
  async save(req: Request, res: Response): Promise<void> {
    const userReq = plainToClass(UserRequest, req.body);

    await this.userRepository.add(userReq);

    res.status(201).json();
  }

  @Delete('/:id')
  async delete(req: Request, res: Response): Promise<void> {
    const userReq = plainToClass(UserRequest, req.params);

    await this.userRepository.remove(userReq);

    res.status(204).json();
  }

}
