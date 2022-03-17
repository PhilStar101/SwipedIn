import { Test, TestingModule } from '@nestjs/testing';

import { ProfilesController } from '../profiles.controller';
import { ProfilesService } from '../profiles.service';

describe('ProfilesController', () => {
  let controller: ProfilesController;
  const profileDto = {
    username: 'PhilStar',
    providerIds: {
      google: '123',
    },
    confirmed: false,
  };

  const mockProfilesService = {
    create: jest.fn((dto) => ({
      id: 'someId',
      ...dto,
    })),
    findAll: jest.fn(() => [
      {
        id: 'someId1',
        ...profileDto,
      },
      {
        id: 'someId2',
        ...profileDto,
      },
    ]),
    findOne: jest.fn((id) => ({
      id,
      ...profileDto,
    })),
    findByProvider: jest.fn((provider, id) => ({
      id: 'someId',
      ...profileDto,
      providerIds: {
        [provider]: id,
      },
    })),
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id) => ({
      id,
      ...profileDto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [ProfilesService],
    })
      .overrideProvider(ProfilesService)
      .useValue(mockProfilesService)
      .compile();

    controller = module.get<ProfilesController>(ProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a profile', () => {
    expect(controller.create(profileDto)).toEqual({
      id: expect.any(String),
      ...profileDto,
    });
    expect(mockProfilesService.create).toBeCalledWith(profileDto);
  });

  it('should findOne profile', () => {
    const findId = 'someId';
    expect(controller.findOne(findId)).toEqual({
      id: findId,
      ...profileDto,
    });
    expect(mockProfilesService.findOne).toBeCalledWith(findId);
  });

  it('should findOne profile', () => {
    const paginationParams = {
      offset: 0,
      limit: 10,
    };
    expect(controller.findAll(paginationParams)).toHaveLength(2);
    expect(mockProfilesService.findAll).toBeCalledWith(paginationParams);
  });

  it('should findByProvider profile', () => {
    expect(controller.findByProvider('google', '123')).toEqual({
      id: 'someId',
      ...profileDto,
      providerIds: {
        google: '123',
      },
    });
    expect(mockProfilesService.findByProvider).toBeCalledWith('google', '123');
  });

  it('should update a profile', () => {
    const updateProfileDto = {
      username: 'PhilStar',
      providerIds: {
        google: '123',
      },
      confirmed: false,
    };
    const updateId = 'someId';
    expect(controller.update(updateId, updateProfileDto)).toEqual({
      id: updateId,
      ...updateProfileDto,
    });
    expect(mockProfilesService.update).toBeCalledWith(
      updateId,
      updateProfileDto,
    );
  });

  it('should remove a profile', () => {
    const removeId = 'someId';
    expect(controller.remove(removeId)).toEqual({
      id: removeId,
      ...profileDto,
    });
    expect(mockProfilesService.remove).toBeCalledWith(removeId);
  });
});
