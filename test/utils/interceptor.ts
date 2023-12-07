// @ts-nocheck

import { Request, Response } from 'express';

export function mockRequest(data?: { body?, params?}) {
  const req: Request = {}
  req.body = data?.body ?? jest.fn().mockReturnValue(req)
  req.params = data?.params ?? jest.fn().mockReturnValue(req)
  return req;
}

export function mockResponse(data?: { send?, status?, json?}) {
  const res: Response = {}
  res.send = data?.send ?? jest.fn().mockReturnValue(res)
  res.status = data?.status ?? jest.fn().mockReturnValue(res)
  res.json = data?.json ?? jest.fn().mockReturnValue(res)
  return res;
}
