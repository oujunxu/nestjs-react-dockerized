import { JwtModule } from "@nestjs/jwt";
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from './service/auth.service';
import { RolesGuard } from "src/guards/roles.guard";
import { JwtAuthGuard } from "src/guards/jwt-guard";
import { JwtStrategy } from "src/guards/jwt-strategy";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (ConfigService: ConfigService) => ({
                secret: ConfigService.get('JWT_SECRET'), //process.env.JWT_SECRET
                signOptions: {expiresIn: '10000s'}
            })
        })
    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}