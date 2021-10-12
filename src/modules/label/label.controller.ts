import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { LabelDto } from './dto/label.dto';
import { LabelService } from './label.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path'


@Controller('users')
export class LabelController {
    constructor(private labelService: LabelService) {}

    @Post('admin/add/image/label/:id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads', 
          filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      }))
      async uploadLabelImage( @UploadedFile() file, @Req() req, @Param('id') id) {
        console.log(file)
        await this.labelService.addLabelImage(id, req.file.path)
      }

    @Post('admin/:id/create/label')
    async createLabel(@Body() label:LabelDto, @Param() id) {
        return await this.labelService.createLabel(label, id);
    }

    @Get('admin/get/list/label')
    async getLabels() {
        return await this.labelService.getLabels();
    }

    @Get('admin/get/label/by/:id')
    async getLabelById(@Param('id') id) {
        return await this.labelService.getLabelById(id);
    }

    @Get('admin/get/label/by/name')
    async getLabelByName(@Body() name:string) {
        return await this.labelService.getLabelByName(name);
    }

    @Delete('admin/delete/label/by/:id')
    async deleteLabel(@Param('id') id, @Body() user_id) {
        return await this.labelService.deleteLabel(user_id, id);
    }


}
