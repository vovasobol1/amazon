import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.servise";
import {AuthDto} from "./auth.dto";
import {faker} from "@faker-js/faker";
import {hash} from "argon2";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(private prisma : PrismaService , private jwt : JwtService) {}
    async register(dto : AuthDto){
        const oldUser = await this.prisma.user.findUnique({
            where:{
                email : dto.email
            }
        })

        if (oldUser){
            throw new BadRequestException('user already exist')
        }

        const user = await this.prisma.user.create({
            data : {
                email : dto.email,
                name : faker.name.firstName() ,
                avatarPath : faker.image.avatar() ,
                phone : faker.phone.number('+7 (###) ### ##-##') ,
                password : await hash(dto.password)

            }
        })

        return user
    }

    private async issueTokens(userId : number) {
        const {data} = {id : userId}

    }

}
