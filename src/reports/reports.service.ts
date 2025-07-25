import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/entities/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {
    // console.log('====================================');
    // console.log(repo);
    // console.log('====================================');
  }

  /**
   * 리포트 생성
   * @param reportDto
   * @returns
   */
  create = async (reportDto: CreateReportDto, user: User) => {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  };

  /**
   *
   * @param id
   * @param approved
   * @returns
   */
  changeApproval = async (id: string, approved: boolean) => {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!report) {
      throw new NotFoundException(`${id} report not found`);
    }
    report.approved = approved;

    return this.repo.save(report);
  };

  createEstimate = async (query: GetEstimateDto) => {
    const { make, model, lng, lat, mileage, year } = query;
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where(`make = :make`, { make: make })
      .andWhere(`model = :model`, { model: model })
      .andWhere(`lng - :lng BETWEEN -5 AND 5`, { lng: lng })
      .andWhere(`lat - :lat BETWEEN -5 AND 5`, { lat: lat })
      .andWhere(`year - :year BETWEEN -3 AND 3`, { year })
      .orderBy(`ABS(mileage - :mileage)`, 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawMany();
  };
}
