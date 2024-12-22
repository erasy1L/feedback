import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @ApiOkResponse({
    schema: {
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  @Post('sign-up')
  async signUp(@Body() credentialsDto: CredentialsDto) {
    return await this.authService.signUp(credentialsDto);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiInternalServerErrorResponse()
  @ApiOkResponse({
    schema: {
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  @Post('sign-in')
  async signIn(@Body() credentialsDto: CredentialsDto) {
    return await this.authService.signIn(credentialsDto);
  }

  @ApiOperation({ summary: 'Get information about logged in user' })
  @ApiInternalServerErrorResponse()
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
      },
    },
  })
  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    return { id: req['user'].sub, email: req['user'].email };
  }
}
