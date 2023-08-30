import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserI, UserRole } from '../models/user.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { hasRoles } from 'src/decorators/roles.decorators';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    add(@Body() user:UserI):Observable<UserI | Object | string>{
        return this.userService.add(user).pipe(
            map((user: UserI) => user),
            catchError(err => of({error: err.message}))
        );
    }

    @Post('login')
    login(@Body() user: UserI): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return {access_token: jwt}
            })
        );
    }

    @Get()
    index(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Observable<Pagination<UserI>>{
        limit = limit > 100 ? 100 : limit;
        return this.userService.paginate({page: Number(page), limit: Number(limit), route: 'localhost:8080/users'});
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAll():Observable<UserI[]>{
       return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param() params: any): Observable<UserI>{
        return this.userService.findOne(params.id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() user:UserI):Observable<any>{
        return this.userService.update(Number(id), user);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number):Observable<any>{
        return this.userService.deleteOne(Number(id));
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateUserRole(@Param('id') id: number, @Body() user: UserI ): Observable<UserI>{
        return this.userService.updateUserRole(Number(id), user);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/admin/update')
    adminUpdate(@Param('id') id: number, @Body() user:UserI): Observable<UserI>{
        return this.userService.adminUpdate(Number(id), user);
    }
}
