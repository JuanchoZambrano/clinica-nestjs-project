import { PartialType } from '@nestjs/mapped-types'
import { CreateMedicDto } from './create.medic.dto.js'

export class UpdateMedicDto extends PartialType(CreateMedicDto) {}