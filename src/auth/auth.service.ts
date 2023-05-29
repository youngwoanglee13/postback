import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { jwtConfig } from 'src/jwt/jwt.config';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private authRepository: Repository<UserEntity>) { }
    async signUp(user: UserEntity): Promise<String> {
        user.password = await this.setHashPassword(user.password);
        const userExist = await this.authRepository.findOne({where: {email: user.email}});
        if (userExist) {
            throw new ConflictException ('El correo ya está registrado');
        }
        const newUser = await this.authRepository.save(user);
        return this.setToken(newUser.id, newUser.role);
    }
    async signIn(email: string, password: string): Promise<String> {
        const user = await this.authRepository.findOne({where: {email}});
        if (!user) {
            throw new UnauthorizedException('El correo no está registrado');
        }
        const isMatch = await this.comparePasswords(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }
        return this.setToken(user.id, user.role);
        
    }
    async comparePasswords(password: string, hashedPassword: string): Promise<String> {
        const user = await bcrypt.compare(password, hashedPassword);
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch; 
    }
    async setHashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    async setToken(id: number, role: string): Promise<string> {
        const payload = {
            id: id,
            role: role
          };
        const newtoken = await jwt.sign(payload, jwtConfig.secret,);
        return newtoken;   
    }
    async getAllUsers(): Promise<UserEntity[]> {//eliminar este metodo cuando se termine el proyecto
        return await this.authRepository.find();
    }
}
