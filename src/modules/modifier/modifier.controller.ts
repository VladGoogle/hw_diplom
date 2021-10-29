
import { ModifiersService } from './modifier.service';
import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put } from '@nestjs/common';
import { ModifierDto } from './dto/modifier.dto';


@Controller()
export class ModifierController {
    constructor(private modService: ModifiersService) {}

    @Post('users/:id/modifiers')
    async addModToProduct(@Body () mod:ModifierDto, @Param('id') id:string) {
        const userId = parseInt(id)
        return await this.modService.createModifier(mod, userId)
    }

    @Get('modifiers/:id')
    async getModifierById(@Param('id') id:string) {
        const userId = parseInt(id)
        return await this.modService.getModifierById(userId)
    }

    @Get('modifiers/:name')
    async getModifierByName(@Param('name') name:string) {
        return await this.modService.getModifierByName(name)
    }

    @Get('modififers')
    async getModifiers() {
        return await this.modService.getModifiers()
    }

    @Delete('users/:user_id/modifiers/:mod_id')
    async deleteModififer(@Param('user_id') user_id:string, @Param('mod_id') mod_id:string) {
        const userId = parseInt(user_id)
        const modId = parseInt(mod_id)
        return await this.modService.deleteModifier(userId, modId)
    }
}
