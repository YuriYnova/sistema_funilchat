import {HuggingFace, HuggingFaceQuestionAnswerConfig} from '../../types/huggingFace';
import {HuggingFaceQuestionAnswerResult} from '../../types/huggingFaceResult';
import {MessageContentI} from '../../types/messagesInternal';
import {HuggingFaceIO} from './huggingFaceIO';
import {Response} from '../../types/response';
import {botconversaChat} from '../../botconversaChat';

export class HuggingFaceQuestionAnswerIO extends HuggingFaceIO {
  override permittedErrorPrefixes = ['Authorization header', 'Error in'];

  private readonly context: string;

  constructor(botconversaChat: botconversaChat) {
    const config = botconversaChat.directConnection?.huggingFace?.questionAnswer as NonNullable<HuggingFace['questionAnswer']>;
    const apiKey = botconversaChat.directConnection?.huggingFace;
    super(botconversaChat, 'Ask a question', 'bert-large-uncased-whole-word-masking-finetuned-squad', config, apiKey);
    this.context = config.context;
  }

  override preprocessBody(_: HuggingFaceQuestionAnswerConfig, messages: MessageContentI[]) {
    const mostRecentMessageText = messages[messages.length - 1].text;
    if (!mostRecentMessageText) return;
    return {
      inputs: {question: mostRecentMessageText, context: this.context, options: {wait_for_model: true}},
    } as unknown as {inputs: string};
  }

  override async extractResultData(result: HuggingFaceQuestionAnswerResult): Promise<Response> {
    if (result.error) throw result.error;
    return {text: result.answer || ''};
  }
}
