import { SubmitFeedbackUseCase } from './SubmitFeedbackUseCase';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn(); 

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Sumit feedback', () => {
    it('should be able submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: "Example",
            screenshot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA…ECBAgQIAAAQIEaljg/wO8z4GA1wUBGwAAAABJRU5ErkJggg=="
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toBeCalled();
        expect(sendMailSpy).toBeCalled();
    });

    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: "Example",
            screenshot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA…ECBAgQIAAAQIEaljg/wO8z4GA1wUBGwAAAABJRU5ErkJggg=="
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA…ECBAgQIAAAQIEaljg/wO8z4GA1wUBGwAAAABJRU5ErkJggg=="
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: ''
        })).rejects.toThrow();
    });
});