import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Submite feedback',()=>{
    it('should be able to submite a feedback',async ()=>{
        const submitFeedback = new SubmitFeedbackUseCase(
            {create: createFeedbackSpy},
            {sendMail: sendMailSpy}
        )
    await expect(submitFeedback.execute({
        type: 'BUG',
        comment: 'example_comment',
        screenshot: 'data:image/png;base54test.jpg',
    })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('should not be able to submit a feedback without a type',async ()=>{
        const submitFeedback = new SubmitFeedbackUseCase(
            {create: async ()=>{}},
            {sendMail: async ()=>{}}
        )
    await expect(submitFeedback.execute({
        type: '',
        comment: 'example_comment',
        screenshot: 'data:image/png;base54test.jpg',
    })).rejects.toThrow();
    })

    it('should not be able to submit a feedback without a comment',async ()=>{
        const submitFeedback = new SubmitFeedbackUseCase(
            {create: async ()=>{}},
            {sendMail: async ()=>{}}
        )
    await expect(submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base54test.jpg',
    })).rejects.toThrow();
    })

    it('should not be able to submit a feedback with invalid screenshot format',async ()=>{
        const submitFeedback = new SubmitFeedbackUseCase(
            {create: async ()=>{}},
            {sendMail: async ()=>{}}
        )
    await expect(submitFeedback.execute({
        type: 'BUG',
        comment: 'example_comment',
        screenshot: 'test.jpg',
    })).rejects.toThrow();
    })
})