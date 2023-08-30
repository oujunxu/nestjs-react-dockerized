import { Injectable, CanActivate, ExecutionContext, forwardRef, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { UserI } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(()=>UserService))
    private userService: UserService
    ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if(!roles){ //if there's no roles required we can just pass
        return true;
    }
    const request = context.switchToHttp().getRequest();
    const user:UserI = request.user.user;
    console.log(user);

    return this.userService.findOne(user.id).pipe(
        map((user: UserI) => {
            const hasRole = () => roles.indexOf(user.roles) > -1; // checks if role exists for the user
            let hasPermission: boolean = false;

            if(hasRole()){
              hasPermission = true;
            }
            return user && hasPermission;
        })
    )
  }
}