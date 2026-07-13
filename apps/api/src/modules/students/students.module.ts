import { Module } from '@nestjs/common';

import { RolesGuard } from '../../common/guards/roles.guard';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, RolesGuard],
  exports: [StudentsService],
})
export class StudentsModule {}
