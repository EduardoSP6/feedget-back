import express from 'express';

import { NodemailerMailAdapter } from './adapters/nodemailer/NodemailerMailAdapter';
import { SubmitFeedbackUseCase } from './usecases/SubmitFeedbackUseCase';
import { PrismaFeedbackRepository } from './repositories/prisma/PrismaFeedbackRepository';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailerMailAdapter) 

    submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send();
})