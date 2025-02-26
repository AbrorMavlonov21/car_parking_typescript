import { CustomError } from "../../lib/customError";
import { ResData } from "../../lib/resData";
import { IUser } from "./interfaces/user.interface";
import { IUserRepository } from "./interfaces/user.repository";
import { UserService } from "./user.service";

const mockUserRepository: jest.Mocked<IUserRepository> = {
  create : jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getAll: jest.fn(),
  getOneById: jest.fn(),
  getOneByPhone: jest.fn(),
}
const userService = new UserService(mockUserRepository)

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
describe('getAll', () => {
  it('should return all users', async () => {
    const mockUsers: IUser[] = [
      {id: 1, phone: '12345678', password: 'testPassword', fullname: 'Test 1'},
      { id: 2, phone: '87654321', password: 'testPassword2', fullname: 'Test 2'}
    ];
    mockUserRepository.getAll.mockResolvedValue(mockUsers);

    const result = await userService.getAll();

    expect(mockUserRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual(new ResData(200, "Success", mockUsers));

  });
  // it('should return error if repository .getall fails', async () => {

  //   mockUserRepository.getAll.mockRejectedValue(new Error('Database error'));

  //   await expect(userService.getAll()).rejects.toThrow('Database error');
  //  });

});
describe('create', () => {
  it('should create a user', async () => {
    const mockUser: IUser = {
      id: 1,
      phone: '12345678',
      password: 'testPassword',
      fullname: 'Test 1'
    }
    mockUserRepository.create.mockResolvedValue(mockUser);

    const dto = {id: 1, phone: '1234567890', password: 'testPassword', fullname: 'Test 1' };

    const result =  await userService.create(dto);
    expect(mockUserRepository.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(new ResData(201, "Created Successfully", mockUser))
  })
});
describe('getByPhone', () =>{
  it('should find user by phone', async () =>{
    const mockUser: IUser = {
      id: 1,
      phone: '12345678',
      password: 'testPassword',
      fullname: 'Test 1'
    }
    mockUserRepository.getOneByPhone.mockResolvedValue(mockUser);
    const phone = '12345678';

    const result = await userService.getByPhone(phone);
    expect(mockUserRepository.getOneByPhone).toHaveBeenCalledWith(phone);
    expect(result).toEqual(new ResData(200, "success", mockUser));
  });
  it('should return 404 if user is not found by phone', async () => {
    mockUserRepository.getOneByPhone.mockResolvedValue(undefined);
    const phone = '00000000';
    const result = await userService.getByPhone(phone);
    expect(mockUserRepository.getOneByPhone).toHaveBeenCalledWith(phone);
    expect(result.meta.statusCode).toBe(404);
    expect(result.meta.message).toBe("user not found by phone");
  });
});
describe('getById', () =>{
  it('should find user by id', async () =>{
    const mockUser: IUser = {
      id: 1,
      phone: '12345678',
      password: 'testPassword',
      fullname: 'Test 1'
    }
    mockUserRepository.getOneById.mockResolvedValue(mockUser);
    const id = 1;
    const result = await userService.getById(id);
    expect(mockUserRepository.getOneById).toHaveBeenCalledWith(id);
    expect(result).toEqual(new ResData(200, "success", mockUser));
  });
  it('should return 404 if user is not found by id', async () => {
    mockUserRepository.getOneById.mockResolvedValue(undefined);
    const id = 999;
    await expect(userService.getById(id)).rejects.toThrow(new CustomError(404, "user not found"));
  });
});
describe('update', () => {
  it('should update user', async () =>{
    const mockUser: IUser = {
      id: 1,
      phone: '12345678',
      password: 'testPassword',
      fullname: 'Test 1'
    }
    mockUserRepository.update.mockResolvedValue(mockUser);
    const id = 1;
    const dto = { id: 1, phone: '1234567890', password: 'testPassword', fullname: 'Test 1' };
    const result = await userService.update(id, dto);
    expect(mockUserRepository.update).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(new ResData(200, "Updated Successfully", mockUser));
  })
});
  describe('delete', () => {
    it('should delete user', async () => {
      const mockUser: IUser = {
        id: 1,
        phone: '12345678',
        password: 'testPassword',
        fullname: 'Test 1'
      }
      mockUserRepository.delete.mockResolvedValue(mockUser);
      const id = 1;
      const result = await userService.delete(id);
      expect(mockUserRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(new ResData(200, "Deleted Successfully", mockUser));
    })
  });
});
