import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/primsa-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

//GET = Buscar informações
//POST = Cadastrar informações
//PUT = Atualizar informações de uma entidade
//PATCH = Atualizar uma informação única em uma entidade
//DELETE = Deletar uma entidade.

routes.post('/feedbacks', async (req,res)=>{
    const {type, comment, screenshot} = req.body;
    
    const prismaFeedbacksRepository= new PrismaFeedbacksRepository()
    const nodeMailerAdapter = new NodemailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodeMailerAdapter
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })
   

  

    return res.status(201).send()
    });