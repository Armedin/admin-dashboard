import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get('')
  doSmth() {
    return 'ok';
  }
}
