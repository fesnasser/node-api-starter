import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './http/router';
import './domain/user/user.controller';
import bodyParser from 'body-parser';
import Container from "typedi";
import UserRepository from "./domain/user/user.repository";

dotenv.config();

const PORT = process.env.PORT || 4000
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
const FRONTEND_HOST = process.env.FRONTEND_HOST || ''

const app = express();

app.use(cors({
  origin: [FRONTEND_HOST]
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

Container.set('UserRepository', UserRepository);

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
});
