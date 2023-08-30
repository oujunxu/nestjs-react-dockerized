import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { GameEntity } from '../models/game.entity';
import { Repository } from 'typeorm';
import { GameI } from '../models/game.interface';

@Injectable()
export class GameService {
    constructor(      
        @InjectRepository(GameEntity)
        private gameRepository: Repository<GameEntity>
        ){}

    add(game:GameI): Observable<GameI>{
        return from(this.gameRepository.save(game));
    }

    findAll(): Observable<GameI[]>{
        return from(this.gameRepository.find())
    }

    deleteOne(id: number): Observable<any>{
        return from(this.gameRepository.delete({id}))
    }
}
