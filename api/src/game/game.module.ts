import { Module } from '@nestjs/common';
import { GameEntity } from './models/game.entity';
import { GameService } from './service/game.service';
import { GameController } from './controller/game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([GameEntity])
    ],
    providers: [GameService],
    controllers: [GameController],
    exports: [GameService]
   })
export class GameModule {}