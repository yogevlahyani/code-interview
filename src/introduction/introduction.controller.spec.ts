import { Test, TestingModule } from '@nestjs/testing';
import { IntroductionController } from './introduction.controller';

describe('IntroductionController', () => {
  let controller: IntroductionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntroductionController],
    }).compile();

    controller = module.get<IntroductionController>(IntroductionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
