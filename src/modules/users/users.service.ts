import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(data: Partial<User>) {
    return this.usersRepository.save(data);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  findById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['ownedProperties', 'managedProperties'],
    });
  }

  findByIdOrUndefined(id: string | null) {
    if (!id) return undefined;
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  softDelete(id: string) {
    return this.usersRepository.softDelete(id);
  }
}
