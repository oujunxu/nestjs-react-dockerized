import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { GameService } from '../service/game.service';
import { Observable } from 'rxjs';
import { GameI } from '../models/game.interface';

@Controller('game')
export class GameController {
    constructor(private gameService: GameService){}

    @Post()
    add(@Body() game:GameI):Observable<GameI | Object | string>{
        return this.gameService.add(game);
    }

    @Get()
    findAll():Observable<GameI[]>{
        return this.gameService.findAll();
    }

    @Delete()
    deleteOne(@Body() gameId:number):Observable<any>{
        return this.gameService.deleteOne(gameId);
    }
}
