import { Body, Controller, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Patch, Param } from '@nestjs/common';
import { Get, Query } from '@nestjs/common';

import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    console.log('====================================');
    console.log(user, body);
    console.log('====================================');
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    console.log('====================================');
    console.log(id, body);
    console.log('====================================');
    return this.reportsService.changeApproval(id, body.approved);
  }

  @Get('/')
  getEstimate(@Query() query: GetEstimateDto) {
    console.log('====================================');
    console.log(query);
    console.log('====================================');

    return this.reportsService.createEstimate(query);
  }
}
