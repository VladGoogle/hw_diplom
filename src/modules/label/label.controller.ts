import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { LabelDto } from './dto/label.dto';
import { LabelService } from './label.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path'


@Controller()
export class LabelController {
    constructor(private labelService: LabelService) {}

    @Post('users/:user_id/labels/:label_id/images')
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
      async uploadLabelImage( @UploadedFile() file, @Req() req, @Param('user_id') user_id:string, @Param('label_id') label_id:string) {
        const userId = parseInt(user_id)
        const labelId = parseInt(label_id)
        await this.labelService.addLabelImage(labelId,userId, req.file.path)
      }

    @Post('users/:id/labels')
    async createLabel(@Body() label:LabelDto, @Param('id') id:string) {
        const labelId = parseInt(id)
        return await this.labelService.createLabel(label, labelId);
    }

    @Get('labels')
    async getLabels() {
        return await this.labelService.getLabels();
    }

    @Get('labels/:id')
    async getLabelById(@Param('id') id) {
        return await this.labelService.getLabelById(id);
    }

    @Get('labels/:name')
    async getLabelByName(@Param('name') name:string) {
        return await this.labelService.getLabelByName(name);
    }

    @Delete('users/:user_id/labels/:label_id')
    async deleteLabel(@Param('user_id') user_id:string, @Param('label_id') label_id:string) {
        const userId = parseInt(user_id)
        const labelId = parseInt(label_id)
        return await this.labelService.deleteLabel(userId, labelId);
    }


}
