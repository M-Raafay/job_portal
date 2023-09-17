import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LogInDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
constructor(
    private prismaService:PrismaService,
    private configService:ConfigService,
    private jwt:JwtService
    ){}

    async signup(signupDto: SignUpDto) {
    try{
    const {password, ...userData} = signupDto
    const hashedPassword:string =  await bcrypt.hash(password,10)
        if (!hashedPassword)
            throw new InternalServerErrorException('password encryption issue');

        const userCreated = await this.prismaService.users.create({
        data :{
            ...userData,
            password:hashedPassword
        }
        })        

        return {message:"success"}// remove password // return user created object and parse bigint

    }catch(error){
        // email unique error
        if (error.code === 'P2002') {
            throw new NotAcceptableException('Email already exists');
          }
         
     throw new InternalServerErrorException('Error occurred during signup', error.message)

    }
 }



    async login(loginDto: LogInDto) {
    try {
        const user = await this.prismaService.users.findUnique({
        where: {
            email: loginDto.email,
        },
        });
        
        if (!user) 
         throw new NotFoundException('User doesnot exist!');

        const isPasswordMatch = await bcrypt.compare(loginDto.password,user.password);  

        if (!isPasswordMatch){         
         throw new ConflictException('Password incorrect');
        }
        const token =  this.generateToken(user.id, user.email, user.role)
        return token;

    } catch (err) {
        throw err
        //throw new HttpException(err.message, err.status)
    }
    }


    async generateToken(
    id:string,
    email:string,
    role:string){

    const payload = {
        id:id,
        email:email,
        role:role     
    }

    const jwt_secret = this.configService.get('JWT_SECRET')

    const token = await this.jwt.signAsync(payload, {
        expiresIn: '1h',
        secret: jwt_secret
    });

    return {
        access_token: token
    };
    }
    
}
