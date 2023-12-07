import UserController from "../../src/domain/user/user.controller";
import { Request, Response } from 'express';
import { mockRequest, mockResponse } from "../utils/interceptor";
import { UserResponse } from "../../src/domain/user/userResponse.http";
import UserRepository from "../../src/domain/user/user.repository";
import { UserRequest } from "../../src/domain/user/userRequest.http";

describe('UserController', () => {
  const userController = new UserController(new UserRepository());
  const userRequest: UserRequest = { id: 1 };
  const userResponse: UserResponse = { id: 1 };

  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  describe('getAll', () => {
    it('returns status code 200', async () => {
      await saveUser(userRequest);

      await userController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([userResponse]);
    });
  });

  describe('getOne', () => {
    it('returns status code 200', async () => {
      await saveUser(userRequest);

      const getOneReq = mockRequest({ params: userRequest });
      await userController.getOne(getOneReq, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(userResponse);
    });
  });

  async function saveUser(data: UserRequest) {
    const saveReq = mockRequest({ body: data });
    await userController.save(saveReq, res);
  }
});
