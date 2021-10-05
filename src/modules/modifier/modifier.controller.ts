
import { ModifiersService } from './modifier.service';
import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put } from '@nestjs/common';
import { ModifierDto } from './dto/modifier.dto';


@Controller('users')
export class ModifierController {
    constructor(private modService: ModifiersService) {}

    @Post('admin/:id/create/modifier')
    async addModToProduct(@Body () mod:ModifierDto, @Param() id) {
        return await this.modService.createModifier(mod, id)
    }

    @Get('modififer/get/by/:id')
    async getModifierById(@Param() id) {
        return await this.modService.getModifierById(id)
    }

    @Get('modififer/get/by/name')
    async getModifierByName(@Body() name:string) {
        return await this.modService.getModifierByName(name)
    }

    @Get('modififer/get/list')
    async getModifiers() {
        return await this.modService.getModifiers()
    }

    @Delete('admin/:id/delete/modifier')
    async deleteModififer(@Param() id, @Body() mod_id:number) {
        return await this.modService.deleteModifier(id, mod_id)
    }
}
