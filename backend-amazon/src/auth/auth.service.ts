import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.servise";

@Injectable()
export class AuthService {
    constructor(private prisma : PrismaService) {}
}
